const { SerialPort } = require('serialport')
const { ByteLengthParser } = require('@serialport/parser-byte-length')
const ks = require('node-key-sender');


const BAUD_RATE = 9600;

ks.setOption('globalDelayPressMillisec', 1000);

SerialPort.list().then((data, err) => {
    for (portinfo of data) {
        const readPort = new SerialPort({
            path: portinfo.path,
            baudRate: BAUD_RATE,
            autoOpen: false,

        })

        readPort.open(function (err) {
            if (err) {
                return console.log('Error opening port: ', err.message)
            }

            const parser = readPort.pipe(new ByteLengthParser({ length: 1 }))
            parser.on("readable", () => {
                const data = parser.read()
                switch (data[0]) {
                    case 50:
                        ks.sendKey('left');
                        break;
                    /*case 38:
                        ks.sendKey('up');*/
                        break;
                    case 49:
                        ks.sendKey('right');
                        break;
                    /*case 40:
                        ks.sendKey('down');
                        break;*/
                    case 48:
                        ks.sendKey('enter');
                        break;
                }
            })
        })
    }
});