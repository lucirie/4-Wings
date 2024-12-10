window.onload = async function () {
    webcamElement = document.getElementById('webcam');
    predictionElement = document.getElementById('prediction');

    canvasElement = document.createElement('canvas');
    document.body.appendChild(canvasElement);

    canvasElement.style.display = 'block';
    canvasElement.style.margin = '0 auto';
    canvasElement.style.border = '2px solid #cccccc';
    canvasElement.style.borderRadius = '10px';
    canvasElement.style.boxShadow = '5px 5px 15px rgba(0, 0, 0, 0.5)';

    canvasCtx = canvasElement.getContext('2d');

    stream = await navigator.mediaDevices.getUserMedia({ video: true })
    webcamElement.srcObject = stream;
    webcamElement.style.display = 'none'; //hide webcam

    hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (results.multiHandLandmarks.length > 0) {
            for (landmarks of results.multiHandLandmarks) {
                // Log the landmarks data to the console
                console.log("This is data coming from your joints. Using this, we can create applications like sign language interperters and even remote control of computers.:", landmarks);

                // Draw the connectors and landmarks
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#FF00FF', lineWidth: 2 });
                drawLandmarks(canvasCtx, landmarks, { color: '#00FFFF', lineWidth: 1 });
            }
        }
        canvasCtx.restore();
    });

    camera = new Camera(webcamElement, {
        onFrame: async () => {
            await hands.send({ image: webcamElement });
        },
        width: 640,
        height: 480,
    });
    camera.start();

    webcamElement.addEventListener('loadeddata', () => {
        canvasElement.width = webcamElement.videoWidth;
        canvasElement.height = webcamElement.videoHeight;
    });
}
