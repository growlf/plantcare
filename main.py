# modes
# 0 = running mode
# 1 = lower thresshold setting
# 2 = upper thresshold setting

def on_button_pressed_a():
    global mode, threshold_lower, threshold_upper
    if mode == 0:
        # If running mode, switch to threshold_lower editing
        basic.show_leds("""
            # # # # #
            . # # # .
            . . # . .
            . . . . .
            # # # # #
            """)
        mode = 1
    elif mode == 1:
        # If lower-edit mode, decrease threshold
        threshold_lower = threshold_lower - 5
        led.plot_bar_graph(threshold_lower, moisture_max)
    elif mode == 2:
        # If upper-edit mode, decrease threshold
        threshold_upper = threshold_upper - 5
        led.plot_bar_graph(threshold_upper, moisture_max)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global mode
    if mode != 0:
        mode = 0
    led.plot_bar_graph(moisturelvl, moisture_max)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global mode, threshold_lower, threshold_upper
    if mode == 0:
        # If running mode, switch to threshold_upper editing
        basic.show_leds("""
            # # # # #
            . . . . .
            . . # . .
            . # # # .
            # # # # #
            """)
        mode = 1
    elif mode == 1:
        # If lower-edit mode, increase threshold
        threshold_lower = threshold_lower + 5
        led.plot_bar_graph(threshold_lower, moisture_max)
    elif mode == 2:
        # If upper-edit mode, increase threshold
        threshold_upper = threshold_upper + 5
        led.plot_bar_graph(threshold_upper, moisture_max)
input.on_button_pressed(Button.B, on_button_pressed_b)

moisturelvl = 0
mode = 0
threshold_lower = 0
threshold_upper = 0
threshold_upper = 600
threshold_lower = 500
moisture_max = 950
delay_ms = 5000

def on_forever():
    global moisturelvl, delay_ms
    moisturelvl = pins.analog_read_pin(AnalogPin.P0)
    if mode == 0:
        if moisturelvl <= threshold_lower:
            basic.show_icon(IconNames.UMBRELLA)
            soundExpression.twinkle.play_until_done()
        else:
            led.plot_bar_graph(moisturelvl, moisture_max)
    basic.pause(delay_ms)
basic.forever(on_forever)
