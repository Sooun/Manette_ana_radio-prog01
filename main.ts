let y = 0
let x = 0
let Y_valeur = 0
let X_valeur = 0
let Moteur_D = 0
let Motor_G = 0
radio.setGroup(1)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
// Facteur de vitesse des moteurs , compris entre 0 et 100
let K_vitesse = 100
// Poids du second moteur. Compris entre 50 et 0.
// 50 => On tourne très peu
// 18 => Bon compromis
// 10 => On tourne très fort.
// 0 => Jostick directionnel ON/OFF
let K_joystick = 18
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        basic.showString("" + convertToText(Motor_G) + ";" + convertToText(Moteur_D))
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
    	
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        basic.showNumber(Motor_G)
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        basic.showNumber(Moteur_D)
    } else {
        X_valeur = pins.analogReadPin(AnalogPin.P1)
        Y_valeur = pins.analogReadPin(AnalogPin.P2)
        x = Math.round(Math.map(X_valeur, 0, 1020, -100, 100))
        y = Math.round(Math.map(Y_valeur, 0, 1020, -100, 100))
        if ((X_valeur <= 480 || Y_valeur >= 540) && (X_valeur < 510 && Y_valeur >= 510)) {
            Motor_G = Math.round(y / 1 - Math.abs(y * x) * ((100 - K_joystick) / 10000))
            Moteur_D = Math.max(Math.abs(x), y)
        } else if ((X_valeur >= 540 || Y_valeur >= 540) && (X_valeur >= 510 && Y_valeur > 510)) {
            Motor_G = Math.max(x, y)
            Moteur_D = Math.round(y / 1 - y * x * ((100 - K_joystick) / 10000))
        } else if ((X_valeur <= 480 || Y_valeur <= 480) && (X_valeur > 510 && Y_valeur <= 500)) {
            Motor_G = Math.min(-1 * x, y)
            Moteur_D = Math.round(y / 1 - y * x * ((100 - K_joystick) / 10000))
        } else if ((X_valeur >= 540 || Y_valeur <= 480) && (X_valeur <= 510 && Y_valeur < 500)) {
            Moteur_D = Math.min(x, y)
            Motor_G = Math.round(y / 1 + y * x * ((100 - K_joystick) / 10000))
        } else {
            Motor_G = 0
            Moteur_D = 0
        }
        Motor_G = Motor_G * K_vitesse * 25
        Moteur_D = Moteur_D * K_vitesse * 25
        radio.sendString("" + convertToText(Motor_G) + ";" + convertToText(Moteur_D))
    }
})
