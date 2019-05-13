var MasterMind = {
  name: 'MasterMind',
  colors: {
    1: '#000000', //Noir
    2: '#FFFFFF', //Blanc
    3: '#CC3333', //Rouge
    4: '#ff9600', //Orange
    5: '#fff000', //Jaune
    6: '#0005c2', //Bleu
  },
  //Paramètre du plateau de jeu
  settings: {
    lines: 16, //lignes dispo pour arriver au résultat
    columns: 4, //colonnes de couleurs
    colors: 6, //coulerus dispo
  },
  //Les valeurs de la progression de partie
  game: {
    turn: 1, //tour en couleurs
    column: 1, //colonne en cours
    selection: new Array(), //selection de couleur du joueur
    soluce: new Array(),
  },
  //fct d'initialistation du jeu
  initialise: function( ){
    this.startGame();
  },
  //fct startGame()
  startGame: function(){
    this.drawGameBoard();
    this.resetGame();
    this.defineSoluce();
  },

  drawGameBoard: function() {
    board = document.getElementById('plateau');
    board.innerHTML = '';

    for (i = this.settings['lines']; i>0; i--) {

      line = document.createElement('tr');
      line.id = 'turn-'+i;

      cell = document.createElement('td');
      cell.innerHTML = i;
      cell.style.width = '32px';
      line.appendChild(cell);

      for (j = 1; j <= this.settings['columns']; j++) {
        cell = document.createElement('td');
        cell.innerHTML = '';
        cell.id = 'turn-'+i+'-'+j;
        cell.style.width = '32px';
        cell.setAttribute('onclick', this.name+'.selectColumn('+i+', '+j+');');
        line.appendChild(cell);
      }

      for (j = 1; j <= this.settings['columns']; j++) {
        cell = document.createElement('td');
        cell.innerHTML = '';
        cell.id = 'result-'+i+'-'+j;
        cell.style.width = '16px';
        line.appendChild(cell);
      }

      cell = document.createElement('td');
      cell.innerHTML = 'OK';
      cell.id = 'valid-'+i;
      cell.className = 'valid';
      cell.style.width = '16px';
      cell.setAttribute('onclick', this.name+'.checkLine('+i+');');
      line.appendChild(cell);

      board.appendChild(line);
    }

    colorSelector = document.getElementById('colorSelector');
    colorSelector.innerHTML = '';

    line = document.createElement('tr');
    for (i=1; i <= this.settings['colors']; i++) {
      cell = document.createElement('td');
      cell.innerHTML = '';
      cell.style.width = '32px';
      line.appendChild(cell);

      pion = document.createElement('div');
      pion.className = 'pion';
      pion.style.background = this.colors[i];
      pion.setAttribute('onclick', this.name+'.selectColor('+i+');');
      cell.appendChild(pion);
    }
    colorSelector.appendChild(line);
  },
  //reinitialise les données du jeu (en remettant le joueur sur la 1ère ligne et colone)
  resetGame: function() {
    this.game['turn'] = 1;
    this.game['column'] = 1;

    document.getElementById('turn-1').className = 'selected';
    document.getElementById('turn-1-1').className = 'selected';
  },

  //calcul de la solution de couleur
  defineSoluce: function(){
    this.game['soluce'] = new Array();
    for (i = 1; i <= this.settings['columns']; i++)
    {
      color = parseInt(Math.random()* this.settings['colors'])+1;
      this.game['soluce'][i] = color;
    }
  },

  selectColor: function(color)
  {
    //Check si la partie est encore active
    if (this.game['turn'] == -1){
      return;
    }
    // Retire la selection précédente si elle existe
    document.getElementById('turn-' + this.game['turn'] + '-' + this.game['column']).innerHTML = '';

    // Ajoute la couleur à la sélection
    this.game['selection'][this.game['column']] = color;

    //Ajoute la couleur sur le plateau
    pion = document.createElement('div');
    pion.className = 'pion';
    pion.style.background = this.colors[color];
    document.getElementById('turn-' + this.game['turn'] + '-' + this.game['column']).appendChild(pion);

    //Retire le visuel sur la case courante
    document.getElementById('turn-' + this.game['turn'] + '-' + this.game['column']).className = '';

    //Verifie si curseur sur last case
    if (this.game['column'] == this.settings['columns']) {
      //Met le curseur 1ere case
      this.game['column'] = 1;
    } else{
      //Deplace le curseur sur next case
      this.game['column']++;
    }

    //Ajoute le marquage sur la nouvelle case courante
    document.getElementById('turn-' + this.game['turn'] + '-' + this.game['column']).className = 'selected';
  },

  selectColumn: function(line, column)
  {
    //Check si on est sur la bonne ligne
    //et que la partie est toujours active
    if (line != this.game['turn']){
      return;
    }

    //Retire le marquage visuel de la case courante
    document.getElementById('turn-' + line + '-' + this.game['column']).className = ''

    //Select la new column
    this.game['column'] = column;

    //Applique le marquage visuel sur la nouvelle case courante
    document.getElementById('turn-'+ line + '-' + this.game['column']).className = 'selected';
  },

  checkLine: function(line)
  {
    // Verifie si la ligne est la bonne et si la partie est tjr active
    if (line != this.game['turn']) {
      return;
    }

    //Verifie si la ligne a été complétement remplie
    for (i = 1; i< this.settings['columns']; i++){
      if (!this.game['selection'][i]){
        return;
      }
    }

    //Duplique la solution pour pouvoir la modifier
    //sans modifier l'originale
    soluce = this.game['soluce'].slice(0);

    //Initialise les var de verification
    correct = 0;
    misplaced = 0;

    for (i = 1; i <+ this.settinhs['columns']; i++){
      if(this.game['selection'][i] == soluce[i]) {
        correct++;
        soluce[i] = 0;
        this.game['selection'][i] = 0;
      }
    }

    //Verifie les pions bien placé
    if (correct == this.settings['columns']){
      //Utilise le return pour sortir de la methode et stopper la verification
      return this.displayWin();
    }

    //Verifie les pions mal placé, parmi les autres
    for (i = 1; i <= this.setting['columns']; i++)
    {
      if (this.game['selection'][i] == 0) {
        continue;
      }
      loc = soluce.indexOf(this.game['selection'][i]);

      if(loc != -1) {
        this.game['selection'][i] = 0;
        soluce[loc] = 0;
        misplaced++;
      }
    }

    //affiche le nombre de pions bien placé
    for (i = 1; i <= correct; i++)
    {
      pion = document.createElement('div');
      pion.className = 'correct';
      document.getElementById('result-' + this.game['turn'] + '-' + i).appendChild(pion);
    }

    //Affiche le nombre de pions mal placé
    for (j = i; j < i+misplaced; j++)
    {
      pion = document.createElement('div');
      pion.className = 'misplaced';
      document.getElementById('result-' + this.game['turn']+'-'+j).appendChild(pion);
    }

    //prepare le jeu pour le tour suivant
    //reinitialise la selection du joueur
    this.game['selection'] = new Array();

    //Retire le marquage visuel de la ligne courante
    document.getElementById('turn-' + this.game['turn']).className = '';

    //Check si c'est la last ligne, si oui alors défaite
    if (this.game['turn'] == this.settings['lines'])
    {
      return this.displayLose();
    }

    //deplace le curseur sur la next line
    this.game['turn'] ++;

    //apllique le marquage sur la nvlle ligne
    document.getElementById('turn-' + this.game['turn']).className = 'selected';

    //place le curseur sur la 1ere case
    this.game['column'] = 1;

    //applique le marquage sur la 1ere case
    document.getElementById('turn-' + this.game['turn']+ '-1').className = 'selected';
  },

  displayWin: function() {
    //Affiche le res dans l'espace dédié
    document.getElementById('result').innerHTML = 'Gagné';
    document.getElementById('result').style.color = '#43b456';

    //Affiche le marquage specifique a la victoir sur la ligne courante
    document.getElementById('turn-' + this.game['turn']).className = 'win';

    //Marque la fin de la partie
    this.game['turn'] = -1;
  },

  displayLose: function() {
    //Affiche le res dans l'espace dédié
    document.getElementById('result').innerHTML = 'Perdu';
    document.getElementById('result').style.color = '#CC3333';
    this.game['turn'] = -1;
  },
};
