let app = new Vue({
    el: ".main",
    data: {
        showMain: true,
        showSocial: false,
        showAchivments: false,
        showQuestion: false,
        showResult: false,
        number: 0,
        score: {
            'muggle': 0,
            'gobline': 0,
            'slizerin': 0,
            'gryffindor': 0,
            'hufflepuff': 0,
            'ravenclaw': 0,
        },
        totalGame: localStorage.getItem('hp2TotalGame') ? JSON.parse(localStorage.getItem('hp2TotalGame')) : {
            'muggle': 0,
            'gobline': 0,
            'slizerin': 0,
            'gryffindor': 0,
            'hufflepuff': 0,
            'ravenclaw': 0,
        },
        totalGames: localStorage.getItem('hp2TotalGames') ? localStorage.getItem('hp2TotalGames') : 0,
        questions: questions,
        results: results,
        resultRace: 'muggle',
    },
    methods: {
        goToMain() {
            this.showMain = true
            this.showSocial = false
            this.showAchivments = false
            this.showQuestion = false
            this.showResult = false
        },
        goToSocial() {
            this.showMain = false
            this.showSocial = true
            this.showAchivments = false
            this.showQuestion = false
            this.showResult = false
        },
        goToAchivments() {
            if (this.totalGames > 0) {
                this.showMain = false
                this.showSocial = false
                this.showAchivments = true
                this.showQuestion = false
                this.showResult = false
            } else {
                this.goToQuestions()
            }
        },
        goToQuestions() {
            this.score = {
                'muggle': 0,
                'gobline': 0,
                'slizerin': 0,
                'gryffindor': 0,
                'hufflepuff': 0,
                'ravenclaw': 0,
            }
            this.showMain = false
            this.showSocial = false
            this.showAchivments = false
            this.showQuestion = true
            this.showResult = false
        },
        goToResult(race) {
            this.showMain = false
            this.showSocial = false
            this.showAchivments = false
            this.showQuestion = false
            this.showResult = true
            this.resultRace = race
        },
        nextQuestions(answer) {
            if (this.number == 5) {
                this.number = 0
                this.endGame();
            } else {
                this.number++
            }
            eval(answer)
        },
        endGame() {
            this.totalGames++;
            localStorage.setItem('hp2TotalGames', this.totalGames)
            // Магл
            if (this.score.muggle > this.score.gobline &&
                this.score.muggle > this.score.slizerin &&
                this.score.muggle > this.score.gryffindor &&
                this.score.muggle > this.score.hufflepuff &&
                this.score.muggle > this.score.ravenclaw) {
                this.goToResult('muggle')
                this.totalGame.muggle++
            }
            // Гоблин 
            else if (this.score.gobline > this.score.muggle &&
                this.score.gobline > this.score.slizerin &&
                this.score.gobline > this.score.gryffindor &&
                this.score.gobline > this.score.hufflepuff &&
                this.score.gobline > this.score.ravenclaw) {
                this.goToResult('gobline')
                this.totalGame.gobline++
            }
            // Слизерин
            else if (this.score.slizerin > this.score.muggle &&
                this.score.slizerin > this.score.gobline &&
                this.score.slizerin > this.score.gryffindor &&
                this.score.slizerin > this.score.hufflepuff &&
                this.score.slizerin > this.score.ravenclaw) {
                this.goToResult('slizerin')
                this.totalGame.slizerin++
            }
            // Гриффиндор
            else if (this.score.gryffindor > this.score.muggle &&
                this.score.gryffindor > this.score.gobline &&
                this.score.gryffindor > this.score.slizerin &&
                this.score.gryffindor > this.score.hufflepuff &&
                this.score.gryffindor > this.score.ravenclaw) {
                this.goToResult('gryffindor')
                this.totalGame.gryffindor++
            }
            // Пуффендуй
            else if (this.score.hufflepuff > this.score.muggle &&
                this.score.hufflepuff > this.score.gobline &&
                this.score.hufflepuff > this.score.slizerin &&
                this.score.hufflepuff > this.score.gryffindor &&
                this.score.hufflepuff > this.score.ravenclaw) {
                this.goToResult('hufflepuff')
                this.totalGame.hufflepuff++
            }
            // Когтевран
            else {
                this.goToResult('ravenclaw')
                this.totalGame.ravenclaw++
            }
            
            localStorage.setItem('hp2TotalGame', JSON.stringify(this.totalGame))
        },
    },
    computed: {
        totalScore() {
            let score = 0
            for (let i in this.totalGame) {
                score += (this.totalGame[i] * results[i].points)
            }
            return score
        },
        openRaces() {
            let count = 0
            for (let i in this.totalGame) {
                if (this.totalGame[i] > 0) {
                    count++
                }
            }
            return count
        },
        favoriteRace() {
            let max = 'muggle';
            for (let i in this.totalGame) {
                if (this.totalGame[i] > this.totalGame[max]) {
                    max = i
                }
            }
            return results[max].name
        },
        showResultRace() {
            return {
                'muggle': this.totalGame.muggle > 0 ? true : false,
                'gobline': this.totalGame.gobline > 0 ? true : false,
                'slizerin': this.totalGame.slizerin > 0 ? true : false,
                'gryffindor': this.totalGame.gryffindor > 0 ? true : false,
                'hufflepuff': this.totalGame.hufflepuff > 0 ? true : false,
                'ravenclaw': this.totalGame.ravenclaw > 0 ? true : false,
            }
        }
    }
})