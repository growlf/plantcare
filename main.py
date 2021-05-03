moisturelvl = 0

def on_forever():
    global moisturelvl
    moisturelvl = 0.00
    if pins.digital_read_pin(DigitalPin.P0) <= 0.00:
        basic.show_icon(IconNames.UMBRELLA)
    control.wait_micros(4000)
    basic.show_icon(IconNames.HOUSE)
    print(moisturelvl)
basic.forever(on_forever)
