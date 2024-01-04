const progressData = [
    { name: 'Adjective', percentage: 25 },
    { name: 'Verbal', percentage: 50 },
    { name: 'Conjunction', percentage: 75 },
    { name: 'Determiner', percentage: 90 },
    { name: 'Noun', percentage: 30 },
    { name: 'Proposition', percentage: 60 },
    { name: 'Pronoun', percentage: 80 },
    { name: 'Verb', percentage: 45 },
  ];

  // Placeholder data for circular graph (replace with actual data)
  const circularGraphData = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [{
      data: [30, 40, 30],
      backgroundColor: ['#3D7FB6', '#38404A', '#AAAAAA'],
    }],
  };

  
  function getRandomPercentage() {
    return Math.floor(Math.random() * 101);
  }

  // Function to create progress bars dynamically
  function createProgressBars() {
    const progressBarsContainer = document.querySelector('.progress-bars-container');

    // Example data with random percentages
    const progressData = [
      { name: 'Progress 1', percentage: getRandomPercentage() },
      { name: 'Progress 2', percentage: getRandomPercentage() },
      { name: 'Progress 3', percentage: getRandomPercentage() },
      { name: 'Progress 4', percentage: getRandomPercentage() },
      { name: 'Progress 5', percentage: getRandomPercentage() },
      { name: 'Progress 6', percentage: getRandomPercentage() },
      { name: 'Progress 7', percentage: getRandomPercentage() },
      { name: 'Progress 8', percentage: getRandomPercentage() },
    ];

    progressData.forEach((data, index) => {
      const progressBarContainer = document.createElement('div');
      progressBarContainer.classList.add('progress-bar-container', 'mb-3');

      const labelPercentContainer = document.createElement('div');
      labelPercentContainer.classList.add('progress-label-percent');

      const label = document.createElement('div');
      label.innerText = data.name;
      label.classList.add('progress-label'); /* Add a class for additional styling if needed */

      const percent = document.createElement('div');
      percent.innerText = `${data.percentage}%`;

      const progressBar = document.createElement('div');
      progressBar.classList.add('progress-bar');
      progressBar.style.width = `${data.percentage}%`;

      labelPercentContainer.appendChild(label);
      labelPercentContainer.appendChild(percent);

      progressBarContainer.appendChild(labelPercentContainer);
      progressBarContainer.appendChild(progressBar);
      progressBarsContainer.appendChild(progressBarContainer);
    });
  }

  // Call the function to generate progress bars with random percentages
  createProgressBars();

  // Function to create circular graph
  var ctxD = document.getElementById("doughnutChart").getContext('2d');

  // Generate a random value between 0 and 5
  var randomValue = Math.floor(Math.random() * 6);
  
  // Create a container for both the chart and overlay text
  var overlayContainer = document.createElement('div');
  overlayContainer.className = 'overlay-container';
  document.getElementById("doughnutChart").parentNode.appendChild(overlayContainer);
  overlayContainer.appendChild(document.getElementById("doughnutChart"));
  
  // Overlay text on top of the doughnut chart
  var overlayText = document.createElement('div');
  overlayText.className = 'overlay-text';
  overlayText.textContent = randomValue;
  overlayContainer.appendChild(overlayText);
  
  var myDoughnutChart = new Chart(ctxD, {
    type: 'doughnut',
    data: {
      labels: [], // Set labels array to empty to hide labels
      datasets: [{
        data: [randomValue, 5 - randomValue],
        backgroundColor: ["#A2E588", "#D3D3D3"],
        hoverBackgroundColor: ["#A2E588", "#D3D3D3"],
        cutout: "70%" // Adjust the cutout size to create a hollow effect
      }]
    },
    options: {
      responsive: false, // Set responsive to false
      maintainAspectRatio: false, // Set maintainAspectRatio to false
      legend: {
        display: false // Hide the legend
      }
    }
  });
  
  
  // 1. MediaRecorder instance
let mediaRecorder;

// 2. Blob Array to hold recorded audio
let recordedAudio = [];

// 3. To keep track of total length of recorded audio data
let recordedAudioLength = 0;

// 4. To control playback of the recorded audio
let playbackInstance;

// 5. Recording Controller
const recordingController = {
    stopRecording: () => {
        mediaRecorder.stop();
        stopButton.disabled = true;
        recordButton.disabled = false;
        playButton.disabled = false;
        pauseButton.disabled = false;
        forwardButton.disabled = false;
        backwardButton.disabled = false;
    },

    playRecording: async () => {
        console.log('Playing recording...');
        if (playbackInstance) {
            playbackInstance.pause();
        }
        const blob = new Blob(recordedAudio, { type: 'audio/webm' });
        audio.src = URL.createObjectURL(blob);
        audio.controls = true;
        playbackInstance = await audio.play();
        if (playbackInstance) {
            console.log('Playing...');
        } else {
            console.log('Playback failed');
        }
    },

    pauseRecording: () => {
        console.log('Pausing recording...');
        if (playbackInstance) {
            playbackInstance.pause();
        }
    },

    seekForward: () => {
        console.log('Seeking forward...');
        if (playbackInstance) {
            playbackInstance.currentTime += 10;
        }
    },

    seekBackward: () => {
        console.log('Seeking backward...');
        if (playbackInstance) {
            playbackInstance.currentTime -= 10;
        }
    },
};

function main() {
    const startRecording = () => {
        console.log('Starting recording...');
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                stopButton.disabled = false;
                playButton.disabled = true;
                pauseButton.disabled = true;
                forwardButton.disabled = true;
                backwardButton.disabled = true;

                const audioChunks = [];
                mediaRecorder.addEventListener('dataavailable', event => {
                    console.log('Data available...');
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener('dataavailable', event => {
                    console.log('Processing recorded data...');
                    if (event.data.size > 0) {
                        recordedAudio.push(event.data);
                        recordedAudioLength += event.data.length;
                    }
                });
            })
            .catch(error => {
                console.log('Error: ' + error);
            });
    };

    recordButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', recordingController.stopRecording);
    playButton.addEventListener('click', recordingController.playRecording);
    pauseButton.addEventListener('click', recordingController.pauseRecording);
    forwardButton.addEventListener('click', recordingController.seekForward);
    backwardButton.addEventListener('click', recordingController.seekBackward);
}
let recordButton = document.getElementById('recordButton');
let stopButton = document.getElementById('stopButton');
let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let forwardButton = document.getElementById('forwardButton');
let backwardButton = document.getElementById('backwardButton');
let audio = document.getElementById('audio');
document.addEventListener('DOMContentLoaded', main);