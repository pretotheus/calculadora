const { createApp } = Vue

createApp({
    data() {
        return {
            display: "0",
            numeroAtual: null,
            numeroAnterior: null,
            operador: null,
            aguardarProximoNumero: false
        }
    },
    methods: {
        lidarBotao(botao) {
            switch (botao) {
                case "*":
                case "-":
                case "+":
                case "/":
                    this.lidarOperador(botao)
                    break
                case ".":
                    this.lidarDecimal()
                    break
                case "=":
                    this.lidarIgual()
                    break
                case "AC":
                    this.lidarClear()
                    break
                default:
                    this.lidarNumero(botao)
            }
        },
        lidarOperador(operador) {
            if (this.numeroAtual === null) {
                this.numeroAtual = parseFloat(this.display)
            } else if (this.operador) {
                this.lidarIgual()
            }
            this.operador = operador
            this.numeroAnterior = this.numeroAtual
            this.aguardarProximoNumero = true
        },
        lidarDecimal() {
            if (!this.display.includes(".")) {
                this.display += "."
            }
        },
        lidarIgual() {
            if (this.operador && this.numeroAtual !== null && this.numeroAnterior !== null) {
                const resultado = this.calcular(this.numeroAnterior, this.operador, parseFloat(this.display))
                this.display = resultado.toString()
                this.numeroAtual = resultado
                this.numeroAnterior = null
                this.operador = null
                this.aguardarProximoNumero = false
            }
        },
        lidarClear() {
            this.display = "0"
            this.numeroAtual = null
            this.numeroAnterior = null
            this.operador = null
            this.aguardarProximoNumero = false
        },
        lidarNumero(numero) {
            if (this.aguardarProximoNumero || this.display === "0" || this.operador !== null) {
                this.display = numero.toString()
                this.aguardarProximoNumero = false
            } else {
                this.display += numero.toString()
            }
        },
        calcular(numero1, operador, numero2) {
            switch (operador) {
                case "+":
                    return numero1 + numero2
                case "-":
                    return numero1 - numero2
                case "*":
                    return numero1 * numero2
                case "/":
                    return numero1 / numero2
                default:
                    return numero2
            }
        }
    }
}).mount("#app")
