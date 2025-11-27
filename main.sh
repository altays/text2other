#! /bin/bash

sampleTxt=""
sampleWav=""

randomLoop=$[ ( $RANDOM % 9 )  + 2 ]

if [ "$1" = "a" ] 
then
    echo "route a"
    # node main.js a x $analyzeText
elif [ "$1" = "b" ]
then
    echo "route b" 
    # node main.js r sub $reconstructWords $reconstructSentences
else
    echo "Please indicate a valid route."
fi
