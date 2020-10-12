# Audio-Tob
Library with helpers to interact with the webaudio api. 

The main goal of this package is to provide tools to analyze and consume audio data from the mic input. 



## install
`npm i audio-tob`

or clone this repo and use as you please.

## usage
```
import {getMicInput, getFrequencies} from ./index

const buffer_length = 512 // can be 512, 1024, 2048 it determines the accuracy of the analysis
getMicInput(buffer_length, audioContext?) // this enables listening to the mic, it is necessary to trigger this method onClick due browsers security policies.

getFrequencies() // returns a object with x values, it divides the frequencies by the numebr chosen and return an average for each key.

NOT IMPLEMENTED YET - getTone() // tries to guess the tone, it could be used to build a small tuner, not implemented yet
```


#### examples
You can find some usage examples in the following repos:

- TBD


#### feedback
Please feel free to open issues or PR with suggestions to improve this package. Every idea is welcome.
