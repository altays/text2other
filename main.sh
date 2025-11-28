#! /bin/bash

sampleTxt="testFile.txt"
sampleWav=""

randomLoop=$[ ( $RANDOM % 9 )  + 2 ]

if [ "$1" = "gifTransform" ] 
then
    echo "route gif"
    node modules/convertFile.js $sampleTxt outfile -f=g -s
elif [ "$1" = "wavTransform" ]
then
    echo "route wav transform" 
    node modules/convertFile.js testFile.txt outfile -f=w -s
elif [ "$1" = "wavUnwrap" ]
then
    echo "route wav unwrap" 
    node modules/separateBodyWav.js test.wav
elif [ "$1" = "generate" ]
then
    echo "route generate" 
    node modules/generateFile.js testFile.txt -s=2 -f=w -w=100
elif [ "$1" = "i" ]
then
    echo "route initialize" 
    mkdir inputs outputs/bmp outputs/jpg outputs/mp3 outputs/png outputs/wav 
else
    echo "Please indicate a valid route."
fi
