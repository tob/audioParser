// utilities
const normalize = (val, max, min) =>  { return (val - min) / (max - min); }
const average = (dataArray = []) => {
	const sum =  dataArray.reduce((total, value) => total + value)
	const avg = sum/dataArray.length

	return Number((normalize(avg,255,0)).toPrecision(1))
}


const getMicInput = (length = 512, audioContent = new AudioContext()) => {

	const soundAllowed = function(stream) {
		window.persistAudioStream = stream;
		const audioStream = audioContent.createMediaStreamSource(stream);
		const analyser = audioContent.createAnalyser();
		audioStream.connect(analyser);
		analyser.fftSize = length;
		return analyser
	}

	const soundNotAllowed = function(error) {
		console.log(error);
	};

	/*window.navigator = window.navigator || {};
	/*navigator.getUserMedia =  navigator.getUserMedia       ||
														navigator.webkitGetUserMedia ||
														navigator.mozGetUserMedia    ||
														null;*/
	navigator.getUserMedia({ audio: true }, soundAllowed, soundNotAllowed);
}

const getFrequencies = (analyser, frequencies ) => {

	// get the stream and filter out zeros
	const unitArray = new Uint8Array(analyser.frequencyBinCount).filter((freq, index) => freq > 0);
	// finds the lenght of the part of array to slice
	const length = unitArray.length/frequencies

	let i = 0;
	let response = {}

	do {
		const start = i * length
		const end = start + length

		// gets the part of array we are interested in
		const values = unitArray.slice(start,end);
		analyser.getByteFrequencyData(values);
		if (values.length >= 1) {
			response[i] = average(values);
		}
		i++
	} while (i <= frequencies)

	return response
}



module.exports = {
	getMicInput,
	getFrequencies,
}



