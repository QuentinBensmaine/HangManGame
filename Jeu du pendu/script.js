window.onload = function () {

    let niveau = 10;
    let mot = data.mots[Math.floor(Math.random() * (data.mots.length - 0) + 0)];
    let underscores = [];
    let showLives = document.getElementById("mylives");
    let container = document.getElementById("hold");
    let niv = document.getElementById("niv");
    let compteurs = document.getElementById("container");
    let textarea = document.getElementById("lettres");
    let entrerMot = document.getElementById("entrerMot");
    let jeu = document.getElementById("wrapper");
    let lettresPrises = document.getElementById("tests");
    let dejaTest = document.getElementById("prompt");
    let sep = new RegExp("");
    let motchoisi = mot.split(sep);
    let tests = [];
    let bon;
    let counter = 0;
    let nbjr;
    let compteurWin = 0;
    let compteurLose = 0;
    let chaine;
    let chaineTests;
    let maj


    document.getElementById("1j").onclick = function () {
        jeu.style.display = "none";
        entrerMot.style.display = "none";
        nbjr = 1;
        menu();
    }
    document.getElementById("2j").onclick = function () {
        jeu.style.display = "none";
        entrerMot.style.display = "none";
        nbjr = 2;
        menu();
    }
    document.getElementById("0j").onclick = function () {
        jeu.style.display = "none";
        entrerMot.style.display = "none";
        nbjr = 0;
        menu();
    }
    menu = function () {
        niv.style.display = 'inline';
        document.getElementById('facile').onclick = function () {
            niveau = 10;
            choisirMot();
            niv.style.display = 'none';
        }

        document.getElementById('difficile').onclick = function () {
            niveau = 6;
            choisirMot();
            niv.style.display = 'none';
        }
    }


    canvas = function () {

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };
    canvas();


    //afficher underscores et essais
    traits = function () {
        chaine = underscores.join(' ')
        container.innerHTML = chaine;
        chaineTests = tests.join('-')
        lettresPrises.innerHTML = "Lettres essayées :   " + chaineTests;
        niv.innerHTML = "<button type=\"button\" id=\"facile\">Facile</button><button type=\"button\" id=\"difficile\">Difficile</button>";
    }

    // afficher vies
    comments = function () {
        showLives.innerHTML = "Vous avez " + lives + " vies";
        if (lives < 1) {
            showLives.innerHTML = "Game Over";
            underscores = motchoisi;
            traits();
            textarea.style.display = 'none';
            compteurLose += 1;
        }
        if (counter === motchoisi.length) {
            showLives.innerHTML = "You Win!";
            compteurWin+=1;
            textarea.style.display = 'none';
        }
    }

    // Animate man
    var animate = function () {
        var drawMe = lives;
        drawArray[drawMe]();
    }


    // Hangman
    tete = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    frame1 = function () {
        draw(0, 150, 150, 150);
    };

    frame2 = function () {
        draw(10, 0, 10, 600);
    };

    frame3 = function () {
        draw(0, 5, 70, 5);
    };

    frame4 = function () {
        draw(60, 5, 60, 15);
    };

    torso = function () {
        draw(60, 36, 60, 70);
    };

    droitBras = function () {
        draw(60, 46, 100, 50);
    };

    gaucheBras = function () {
        draw(60, 46, 20, 50);
    };

    droitjambe = function () {
        draw(60, 70, 100, 100);
    };

    gauchejambe = function () {
        draw(60, 70, 20, 100);
    };

    drawArray = [droitjambe, gauchejambe, droitBras, gaucheBras, torso, tete, frame4, frame3, frame2, frame1];

    // essai Function
    document.getElementById("go").onclick = function () {
        bon = false;
        dejaTest.innerHTML = "";
        test = document.getElementById("text").value;
        maj = test.toUpperCase();
        if (tests.includes(test)) {
            dejaTest.innerHTML = "Lettre déjà essayée";
        }
        else {
            for (i = 0; i < motchoisi.length; i++) {
                if (test == motchoisi[i] || maj == motchoisi[i]) {
                    underscores[i] = maj;
                    counter += 1;
                    bon = true;
                }
            }
            if (bon == false) {
                lives--;
                animate();
            }
            tests.push(test);
            console.log(test);
            console.log(bon);
            console.log(lives);
            traits();
            comments();
        }
    }

    // Play
    play = function (niveau) {
        jeu.style.display = 'inline';
        reset();
        traits();
        comments();
        canvas();
        console.log(motchoisi);

        if (nbjr == 0) {
            textarea.style.display = 'none';
            ordinateur();
        }
        else {
            textarea.style.display = 'block';
        }
    }

    choisirMot = function () {
        jeu.style.display = "none";
        if (nbjr == 1) {
            mot = data.mots[Math.floor(Math.random() * (data.mots.length - 0) + 0)];
            motchoisi = mot.split(sep);
            play(niveau);
        }
        else if (nbjr == 2 || nbjr == 0) {
            entrerMot.style.display = "block";
            document.getElementById("essaye").onclick = function () {
                mot = document.getElementById('motentre').value;
                motchoisi = mot.split(sep);
                entrerMot.style.display = "none";
                play(niveau);
            }
        }
    }

    reset = function () {
        context.clearRect(0, 0, 400, 400);
        compteurs.innerHTML = "Victoires : " + compteurWin + "      Défaites : " + compteurLose;
        context.clearRect(0, 0, 400, 400);
        underscores = [];
        for (i = 0; i < motchoisi.length; i++) {
            underscores[i] = "_";
        }
        tests = [];
        lives = niveau;
        counter = 0;
        if (niveau == 6) {
            frame1();
            frame2();
            frame3();
            frame4();
        }
    }

    document.getElementById('reset').onclick = function () {
        choisirMot();
    }

    ordinateur = function () {
        bon = false;
        dejaTest.innerHTML = "";
        test = data.alpha[Math.floor(Math.random() * (data.alpha.length - 0) + 0)];
        if (tests.includes(test)) {
            dejaTest.innerHTML = "Lettre déjà essayée";
        }
        else {
            for (i = 0; i < motchoisi.length; i++) {
                if (test == motchoisi[i]) {
                    underscores[i] = test;
                    counter += 1;
                    bon = true;
                }
            }
            if (bon == false) {
                lives--;
                animate();
            }
            tests.push(test);
            console.log(test);
            console.log(bon);
            console.log(lives);
            traits();
            comments();
        }
        let temp = setTimeout(ordinateur, 2000);
        if (lives == 0 || counter == motchoisi.length) {
            clearTimeout(temp);
        }
    }
}
