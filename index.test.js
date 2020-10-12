const {getFrequencies, getMicInput} = require('./');


// mocks for when I understand how to trigger soundallowed()
const mockCreateMediaStreamSource = jest.fn()
const mockcreateAnalyser = jest.fn()
const mockAudioContext = {createAnalyser: mockcreateAnalyser,
	createMediaStreamSource: mockCreateMediaStreamSource
};
const mockgetUserMedia = jest.fn();

global.navigator.getUserMedia = mockgetUserMedia;
describe('audio-tob', () => {
	describe('getMicInput', () => {
		it('should invoke webAudioAPi', () => {
			getMicInput(512, mockAudioContext);
			expect(mockgetUserMedia).toHaveBeenCalled();
		})
	})

	describe('getFrequencies method', () => {
		let mockfrequencyBinCount;
		let mockgetByteFrequencyData;
		let analyzer;
		let response;

		beforeEach(() => {
			mockfrequencyBinCount = [255,255,255, 255,0,0,0,0,127.5,127.5,127.5,127.5]
			mockgetByteFrequencyData = jest.fn();
			mockgetByteFrequencyData.mockImplementation(() => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
			analyzer = {
				frequencyBinCount: mockfrequencyBinCount,
				getByteFrequencyData: mockgetByteFrequencyData,
			};
			response = getFrequencies(analyzer, 2)
		})

		it('should return a object with 2 keys', () => {
			expect(Object.keys(response).length).toBe(2)
		})

		it('should return a object with 8 keys', () => {
			const bigResponse = getFrequencies(analyzer, 8)
			expect(Object.keys(bigResponse).length).toBe(8)
		})

		it('should filter out empty frequencies', () => {
			expect(response[0]).toBe(1)
			expect(response[1]).toBe(0.5)
		})
	})
})
