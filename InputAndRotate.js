process.stdin.resume();                                     //Duplex data stream. a duplex continuous socket to get the data
process.stdin.setEncoding('utf-8');

let totalString = "";
let rotationFactor = 0;
let sizeOfTotalString = 0;

process.stdin.on('data', (inputStdin) => {                  //triggers when data in received
    console.log("## Input Received : %s", inputStdin);
    totalString+= inputStdin;
    sizeOfTotalString++;
    //console.log("## Total String : %s", totalString);
})

process.stdin.on('end', () => {                             // DOESN'T WORK ON WINDOWS
})

process.stdin.on('resume',() => {
    console.log("\n## INPUT RESUMED : INPUT STARTED : CTRL-C TO PAUSE IT ##\n");
    console.log("################### FORMAT ######################");
    console.log("## LAST ELEMENT IS CONSIDERED AS THE ROTATION FACTOR ##\n");
})

process.on('SIGINT', () => {                                //Event Triggers in CTRL-C
    console.log("############# INPUT PAUSED#####################\n");
    console.log("## Final Total String :-%s", totalString);
    process.stdin.pause();                                  //stops the input process.
    main();
})

function rotateLeft(str, rf) {
    let tempArr = [];
    rf = rf%(str.length);

    for(let i=0;i<str.length;i++) {
        tempArr[i] = str[rf];
        rf = ++rf >= str.length ? rf%(str.length) : rf;
    }

    return tempArr;
}

function main() {
    totalString = totalString.replace(/\s*$/,'').split(/\n| |\r\n/).map((str) => str.replace(/\s*$/,''));
    // totalString = totalString.replace(/\s*$/, '')
    //     .split('\n')
    //     .map(str => str.replace(/\s*$/, ''));
    rotationFactor = totalString[totalString.length-1];
    totalString = totalString.slice(0,totalString.length-1);
    let finalArr = rotateLeft(totalString, rotationFactor);
    console.log(finalArr);
}

