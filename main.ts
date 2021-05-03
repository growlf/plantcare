let moisturelvl = 0
basic.forever(function on_forever() {
    
    moisturelvl = 0.00
    if (pins.digitalReadPin(DigitalPin.P0) <= 0.00) {
        basic.showIcon(IconNames.Umbrella)
    }
    
    control.waitMicros(4000)
    basic.showIcon(IconNames.House)
    console.log(moisturelvl)
})
