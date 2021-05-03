moisturelvl = 0
threshold = 0
threshold = 200

def on_button_pressed_a():
    global threshold
    threshold = threshold - 5
    basic.show_number(threshold)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_forever():
    global moisturelvl
    moisturelvl = pins.analog_read_pin(AnalogPin.P0)
    if moisturelvl <= threshold:
        basic.show_icon(IconNames.UMBRELLA)
    else:
        basic.show_icon(IconNames.HOUSE)
        basic.show_number(moisturelvl)
    basic.pause(1000)
basic.forever(on_forever)
