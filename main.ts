// Permet de réduire la vitesse des moteurs  en jouant sur le facteur K_vitesse
input.onButtonPressed(Button.A, function () {
    if (K_vitesse == Vitesse5) {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse4
        basic.showLeds(`
            . . . . .
            . . . # .
            . . # # .
            . # # # .
            # # # # .
            `)
    } else if (K_vitesse == Vitesse4) {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse3
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . # # . .
            # # # . .
            `)
    } else if (K_vitesse == Vitesse3) {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse2
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . # . . .
            # # . . .
            `)
    } else if (K_vitesse == Vitesse2) {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse1
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # . . . .
            `)
    } else {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse1
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # . . . .
            `)
    }
})
// Permet d'augmenter la vitesse des moteurs  en jouant sur le facteur K_vitesse
input.onButtonPressed(Button.B, function () {
    if (K_vitesse == Vitesse1) {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse2
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . # . . .
            # # . . .
            `)
    } else if (K_vitesse == Vitesse2) {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse3
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . # # . .
            # # # . .
            `)
    } else if (K_vitesse == Vitesse3) {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse4
        basic.showLeds(`
            . . . . .
            . . . # .
            . . # # .
            . # # # .
            # # # # .
            `)
    } else if (K_vitesse == Vitesse4) {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse5
        basic.showLeds(`
            . . . . #
            . . . # #
            . . # # #
            . # # # #
            # # # # #
            `)
    } else {
        // Facteur de vitesse des moteurs , compris entre 0 et 100
        K_vitesse = Vitesse5
        basic.showLeds(`
            . . . . #
            . . . # #
            . . # # #
            . # # # #
            # # # # #
            `)
    }
})
let y = 0
let x = 0
let Y_valeur = 0
let X_valeur = 0
let Moteur_D = 0
let Motor_G = 0
let K_vitesse = 0
let Vitesse1 = 0
let Vitesse2 = 0
let Vitesse3 = 0
let Vitesse4 = 0
let Vitesse5 = 0
radio.setGroup(1)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
pins.setPull(DigitalPin.P12, PinPullMode.PullNone)
Vitesse5 = 100
Vitesse4 = 40
Vitesse3 = 25
Vitesse2 = 18
Vitesse1 = 11
// Facteur de vitesse des moteurs , compris entre 0 et 100
K_vitesse = Vitesse3
// Poids du second moteur. Compris entre 50 et 0.
// 50 => On tourne très peu
// 18 => Bon compromis
// 10 => On tourne très fort.
// 0 => Jostick directionnel ON/OFF
let K_joystick = 18
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . # # . .
    # # # . .
    `)
basic.forever(function () {
    // Dans la première partie du 'Si' on vient lire les 5 boutons poussoirs de la manette
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        basic.showString("" + convertToText(Motor_G) + ";" + convertToText(Moteur_D))
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
    	
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        radio.sendValue("Servo1", 4)
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        radio.sendValue("Servo1", -4)
    } else if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        pins.analogWritePin(AnalogPin.P12, 1023)
        basic.pause(200)
        pins.analogWritePin(AnalogPin.P12, 0)
    } else {
        X_valeur = pins.analogReadPin(AnalogPin.P1)
        Y_valeur = pins.analogReadPin(AnalogPin.P2)
        x = Math.round(Math.map(X_valeur, 0, 1020, -100, 100))
        y = Math.round(Math.map(Y_valeur, 0, 1020, -100, 100))
        // On transforme la position du joystick en information de vitesse pour les moteurs Droit et Gauche qui va de 0 à 100 en marche avant de de -100 à 0 en marche arrière.
        // 
        // Le décodage se fait suivant le cadran où l'on se trouve.
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
        Motor_G = Math.trunc(Motor_G * K_vitesse * 0.025)
        Moteur_D = Math.trunc(Moteur_D * K_vitesse * 0.025)
        // Une fois que l'on a fini, on prépare l'envoi du paquet:
        // 
        // - On applique d'abord un facteur de vitesse pour que la vitesse soit codé entre 0 et 250 au max.
        // 
        // - Puis on envoie une chaine de caractère sous la forme: " 250;250" par exemple.
        radio.sendString("" + convertToText(Motor_G) + ";" + convertToText(Moteur_D))
    }
})
