#! /bin/bash

sampleTxt="testFile.txt"
sampleWav="outfile1788730463411-stretch.wav"

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
    node modules/separateBodyWav.js $sampleWav
elif [ "$1" = "generate" ]
then
    echo "route generate" 
    node modules/generateFile.js testFile.txt -s=2 -f=w -w=100
elif [ "$1" = "i" ]
then
    echo "route initialize" 
    mkdir inputs outputs outputs/bmp outputs/jpg outputs/mp3 outputs/png outputs/wav outputs/gif
else
    echo "Please indicate a valid route."
fi
