<<<<<<< HEAD
/**
 * ACTIVITAT PUZZLE
 */
function SimpleAssociation(){
	//Variables del canvas
	var context;
	var canvasWidth;
	var canvasHeight;
	//var myText = new Text();
	
	//Variables especifiques d'aquesta activitat
	var frontImage='none';
	var colocades=0;
	this.acabat=false;
	var lines,cols;
	var w,h;
	var myImages = new ImageSetMemory();
	var grid;
	var peces;
	var dist;
	var x = new Array();
	var y = new Array();
	var ordArray = new Array();
	var ordArrayImatges = new Array();
	var numPrimer, numSegon;
	var primerClic = false;
	var segonClic = false;
	var tercerClic = false;
	var idPrimer = 'none';
	var idSegon = 'none';
	var numPeca=1;
	var colorlinies, colorhidden, colorfons, colorFonsNoms, background;
	var theX, theY, incrShowX, incrShowY, capes;
	var control = "0x";
	var intentos = 0;
	var segons = 0;
	var aciertos = 0;
	var arxiuSoFi, reprodSoFi, reprodSo;
	
	//Funcio per a inicialitzar l'activitat a partir de les seves dades
	this.init = function(canvas, activityData){
		//Inicialitzar el canvas
		canvasWidth  = canvas.width;
		canvasHeight = canvas.height;
		context = canvas.getContext("2d");
		
		//Inicialitzar la font
		//myText.context = context;
		//myText.face = vector_battle;
		
		/**
		 * Agafem les dades del fitxer data.js
		 */

		w=100;
		h=100;
		
		dist = activityData.atributsActivitat['layout-position'];
		
		colorhidden = activityData.celllist[0].cell[0].atributs['style-color-inactive'];
		if (!colorhidden) colorhidden = "#00000";
		colorhidden = "#"+colorhidden.replace(control,"");
		
		colorfonsbaix = activityData.atributsActivitat['settings-container-gradient-dest'];
		if (!colorfonsbaix) colorfonsbaix = "#00000";
		colorfonsbaix = "#"+colorfonsbaix.replace(control,"");
		
		colorfonsalt = activityData.atributsActivitat['settings-container-gradient-source'];
		if (!colorfonsalt) colorfonsalt = "#00000";
		colorfonsalt = "#"+colorfonsalt.replace(control,"");
		
		gradiente = activityData.atributsActivitat['settings-container-gradient-angle'];
		
		margin = activityData.atributsActivitat['settings-margin'];
		
		background = activityData.atributsActivitat['settings-container-bgColor'];
		if (!background) background="#FFFFFF"; 
		background = "#"+background.replace(control,"");
		
		colorfonsjoc = activityData.atributsActivitat['settings-window-bgColor'];
		if (!colorfonsjoc) colorfonsjoc = "#00000";
		colorfonsjoc = "#"+colorfonsjoc.replace(control,"");
		
		colorlinies = activityData.celllist[0].atributs['style-color-border'];
		if (!colorlinies) colorlinies = "#00000";
		colorlinies = "#"+colorlinies.replace(control,"");
		
		reprodSo = activityData.cell[0].atributs['media-type'];
		reprodSoFi = activityData.cell[1].atributs['media-type'];
		
		arxiuSo = activityData.cell[0].atributs['media-file'];
		arxiuSoFi = activityData.cell[1].atributs['media-file'];
		
		colorFonsNoms = "FFFFFF";	
		
		/**
		 * A partir del layout-position calculem:
		 *	 w: amplada general
		 *	 h: al�ada general
		 *	 incrShowX: amplada pe�a
		 *	 incrShowY: al�ada pe�a
		 */
		
		if ((dist == "AB")||(dist == "BA")){
			lines=activityData.celllist[0].atributs.rows;
			cols=activityData.celllist[0].atributs.cols*2;
				
			incrShowY=(canvasHeight-24)/lines;
			aux=h-incrShowY;
			h=(canvasHeight-24);
			incrShowX=w-aux;
			w=incrShowX*cols;
			if(((w*cols)+24) > canvasWidth){
				w = 100;
				h = 100;
				incrShowX = (canvasWidth-24)/cols;
				aux = w - incrShowX;
				w = incrShowX*cols;
				incrShowY = h - aux;
				h = incrShowY * lines;
			}
			if(((h*lines)+24) > canvasHeight){
				w = 100;
				h = 100;
				incrShowY = (canvasHeight-24)/lines;
				aux = h - incrShowY;
				h = incrShowY*lines;
				incrShowX = w - aux;
				w = incrShowX * cols;
			}
			clines = lines;
			ccols = cols/2;
			
			gridAx=(canvasWidth-w)/2;
			gridAy=(canvasHeight-h)/2;
			
			gridAx2=(canvasWidth-w)/2;
			gridAy2=(canvasHeight-h)/2+(ccols*incrShowY);
		}
		if ((dist == "AUB")||(dist == "BUA")){
			lines=activityData.celllist[0].atributs.rows*2;
			cols=activityData.celllist[0].atributs.cols;
 
			incrShowX=(canvasWidth-24)/cols; 
			aux=w-incrShowX;
			w=(canvasWidth-24);
			incrShowY=h-aux;
			h=incrShowY*lines;
			//musculs SI , pirates NO
			if(((h*lines)+24) > canvasHeight){
				w = 100;
				h = 100;
				incrShowY = (canvasHeight-24)/lines;
				aux = h - incrShowY;
				h = incrShowY*lines;
				incrShowX = w - aux;
				w = incrShowX * cols;
			}
			ccols = cols;
			clines = lines/2;
			
			gridAx2=(canvasWidth-w)/2+(clines*incrShowX);
			gridAy2=(canvasHeight-h)/2;
		}
		
		gridAx=(canvasWidth-w)/2;
		gridAy=(canvasHeight-h)/2;

		/**
		 * Carreguem les imatges a la array Peces.
		 */
		
		var id_img=0;
		var pecesPrimer = new Array();
		var numPrimer = activityData.celllist[0].cell.length; //noms
		var hihaText = activityData.celllist[0].cell[0].atributs.p;
		
		if (hihaText)
		{
			for(var i=0; i<numPrimer; i++)
			{
				var nomImage = activityData.celllist[0].cell[i].atributs.p;
				var novaPeca = new ImageAssociation(context, id_img, nomImage,incrShowX,incrShowY);
				novaPeca.setNumPeca(numPeca);
				pecesPrimer.push(novaPeca);
				id_img++;
				numPeca++;	
			}
		}else{
			for(var i=0; i<numPrimer; i++)
			{
				var myImage = new Image();
				
				myImage.onload = function() {
					imageLoaded = true;
				};
	
				myImage.src = activityData.celllist[0].cell[i].atributs.image;
				var novaPecaImatges = new ImageMemory(context, id_img, myImage,incrShowX,incrShowY);
				novaPecaImatges.setNumPeca(numPeca);
				pecesPrimer.push(novaPecaImatges);
				id_img++;
				numPeca++;
			}
		}
		
		numPeca=1;
		var pecesSegon = new Array();
		var numSegon = activityData.celllist[1].cell.length; //fotos
		var hihaImatge = activityData.celllist[1].cell[0].atributs.image;
		
		if (hihaImatge)
		{
			for(var i=0; i<numSegon; i++)
			{
				var myImage = new Image();
				
				myImage.onload = function() {
					imageLoaded = true;
				};
	
				myImage.src = activityData.celllist[1].cell[i].atributs.image;
				var novaPecaImatges = new ImageMemory(context, id_img, myImage,incrShowX,incrShowY);
				novaPecaImatges.setNumPeca(numPeca);
				pecesSegon.push(novaPecaImatges);
				id_img++;
				numPeca++;
			}
		}else{
			for(var i=0; i<numSegon; i++)
			{
				var nomImage = activityData.celllist[1].cell[i].atributs.p;
				var novaPeca = new ImageAssociation(context, id_img, nomImage,incrShowX,incrShowY);
				novaPeca.setNumPeca(numPeca);
				pecesSegon.push(novaPeca);
				id_img++;
				numPeca++;	
			}
		}
		
		/**
		 * Desordenem les peces.
		 */
		for (var o=0;o<numPrimer;o++){
			ordArray[o]=o;
		}
		for (var o=0;o<numSegon;o++){
			ordArrayImatges[o]=o;
		}
		
		theX = gridAx;
		theY = gridAy;
		var o = 0;
	    
		if ((dist == "AUB")||(dist == "BUA")){
			for(var c=2; c<=lines; c++){
				for(var i=0;i<cols;i++){ 
		        	x[o]=theX;
		        	y[o]=theY;
		        	theX += incrShowX;
		            o++;
			    }
				theX = gridAx;
				theY += incrShowY;
			}
		}else{
			for(var c=2; c<=cols; c++){
				for(var i=0;i<lines;i++){ 
		        	x[o]=theX;
		        	y[o]=theY;
		        	theY += incrShowY;
		            o++;
			    }
				theY = gridAy;
				theX += incrShowX;
			}
		}
		ordArray.sort( randOrd );
		for (var o=0;o<pecesPrimer.length;o++){
			pecesPrimer[o].setPosx(x[ordArray[o]]);
			pecesPrimer[o].setPosy(y[ordArray[o]]);
		}
		
		if ((dist == "AUB")||(dist == "BUA")){
			theX = gridAx;
			theY = gridAy + (incrShowY*(lines/2));
			o=0;
			for(var c=2; c<=lines; c++){	
				for(var i=0;i<cols;i++){ 
		        	x[o]=theX;
		        	y[o]=theY;
		        	theX += incrShowX;
		            o++;
			    }
				theX = gridAx;
				theY += incrShowY;
			}
		}else{
			theX = gridAx + (incrShowX*(cols/2));
			theY = gridAy;
			o=0;
			for(var c=2; c<=cols; c++){
				for(var i=0;i<lines;i++){ 
		        	x[o]=theX;
		        	y[o]=theY;
		        	theY += incrShowY;
		            o++;
			    }
				theY = gridAy;
				theX += incrShowX;
			}
		}
		ordArrayImatges.sort( randOrd );
		for (var o=0;o<pecesSegon.length;o++){
			pecesSegon[o].setPosx(x[ordArrayImatges[o]]);
			pecesSegon[o].setPosy(y[ordArrayImatges[o]]);
		}
		
		/**
		 * Pintem el tauler de peces.
		 */
		/*if ((dist == "AUB")||(dist == "BUA")) h=h/2;
		else w=w/2;*/
		grid = new Grid(context, lines, cols, {width:w,height:h}, {x:gridAx,y:gridAy}, {x:gridAx,y:gridAy});
		//grid2 = new Grid(context, clines, ccols, {width:w,height:h}, {x:gridAx2,y:gridAy2}, {x:gridAx2,y:gridAy2});
		
		for (var o=0;o<pecesPrimer.length;o++){
			pecesPrimer[o].setHidden(false);
			myImages.add(pecesPrimer[o]);
		}
		for (var o=0;o<pecesSegon.length;o++){
			pecesSegon[o].setHidden(false);
			myImages.add(pecesSegon[o]);
		}
		/*
		if (reprodSo == "PLAY_AUDIO")
		{	
			soundManager.url = "./sound/swf/";
			soundManager.flashVersion = 9;
			soundManager.useFlashBlock = false;
			soundManager.onready(function() {
				soundManager.createSound(arxiuSo,arxiuSo);
				soundManager.createSound(arxiuSoFi,arxiuSoFi);
				soundManager.play(arxiuSo);
			});
		}*/
	};
	
	//Aqui dins va el codi de l'activitat
	this.run = function(){
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		segons++;
		context.strokeRect(gridAx,gridAy,w,h);
		
		if(DragData.active){
			if(frontImage=='none'){	
				frontImage=myImages.getFrontImage(DragData.startPosX, DragData.startPosY);
				if(frontImage!='notfound') frontImage.setDraggable();
			}
			if (DragData.currentPosX >= gridAx && DragData.currentPosX < gridAx+w && 
					DragData.currentPosY >= gridAy && DragData.currentPosY < gridAy+h){
				primerClic = true;
				if (segonClic==true && myImages.images[frontImage.id].colocada==false){
					idSegon = frontImage.id;
					numPrimer = myImages.images[idPrimer].numPeca;
					numSegon = myImages.images[idSegon].numPeca;
					
					tercerClic=true;
				}
			}
		}else{
			if (DragData.currentPosX >= gridAx && DragData.currentPosX < gridAx+w && 
					DragData.currentPosY >= gridAy && DragData.currentPosY < gridAy+h){
				if(tercerClic==true){
					if(numPrimer == numSegon &&  idPrimer != idSegon){
						myImages.images[idPrimer].setHidden(true);
						myImages.images[idSegon].setHidden(true);
						myImages.images[idPrimer].setColocada(true);
						myImages.images[idSegon].setColocada(true);
						colocades++;
						aciertos++;
					}
					segonClic = false;
					primerClic = false;
					tercerClic = false;
					idPrimer='none';
					idSegon='none';
					intentos++;
				}
				if(primerClic==true && myImages.images[frontImage.id].colocada==false){
					idPrimer = frontImage.id;
					segonClic = true;
				}
			}
			if(frontImage!='none'){
				if(frontImage!='notfound') frontImage.unsetDraggable();
				frontImage='none';
			}
			primerClic = false;
		}	
		
		//COMPROVAR ESTAT ACTIVITAT
		if(colocades==(numPeca-1)){
			this.acabat=true;
			/*if (reprodSoFi == "PLAY_AUDIO"){
				soundManager.play(arxiuSoFi);
				reprodSoFi = "false";
			}*/
		}
		
		//DRAW THE IMAGE
		if (!gradiente){
			grid.drawFons(background, 0, canvasWidth, canvasHeight, 0);
		}else{
			grid.drawFons(colorfonsalt, colorfonsbaix, canvasWidth, canvasHeight, gradiente);
		}
		grid.drawFonsJoc(colorfonsjoc, "0", margin);
		myImages.draw(colorFonsNoms);
		grid.draw(colorlinies);
		//grid2.draw(colorlinies);
		//grid.drawAssoc(colorlinies,lines,cols,dist);

		contextControl.fillStyle = "black";
		contextControl.font = "14pt Arial";
		tiempo = segons/20;
		tiempo = arrodonir(tiempo,0);
		
		if (android){
			contextControl.fillText(aciertos, 35, 250);
			contextControl.fillText(intentos, 35, 300);
			contextControl.fillText(tiempo, 30, 350);
		}else{
			contextControl.fillText(aciertos, 890, 60);
			contextControl.fillText(intentos, 940, 60);
			contextControl.fillText(tiempo, 990, 60);
		}
		
		if(segonClic){
			context.lineWidth = "5.0";
			context.strokeRect(myImages.images[idPrimer].posx,myImages.images[idPrimer].posy,incrShowX,incrShowY);
			context.lineWidth = "1.0";
		}
		
	};
	
	//Aquest funcio s'ha de cridar un cop s'ha acabat l'activitat i es canvia a una altra
	this.end = function() {
		delete(grid);
		//Aqui hauriem d'alliberar la memoria de les imatges (si es pot)
		return;
	};
}

=======
/**
 * ACTIVITAT PUZZLE
 * @author Noelia Tuset
 */
function SimpleAssociation()
{
	var context;
	var canvasWidth;
	var canvasHeight;
	
	/** Variables especifiques d'aquesta activitat **/
	var frontImage='none';
	this.acabat=false;
	var idPrimer = 'none';
	var idSegon = 'none';
	
	var myImages = new ImageSetMemory();
	var x = new Array();
	var y = new Array();
	var ordArray = new Array();
	var ordArrayImatges = new Array();
	var primerClic = false;
	var segonClic = false;
	var tercerClic = false;
	var control = "0x";
	var intentos = 0;
	var segons = 0;
	var aciertos = 0;
	var colocades=0;
	var numPeca=1;
	var lines, cols, w, h, grid, peces, dist, arxiuSoFi, reprodSoFi, reprodSo;
	var colorlinies, colorhidden, colorfons, colorFonsNoms, background;
	var theX, theY, incrShowX, incrShowY, capes, numPrimer, numSegon;
	
	/**
	 * Funcio per a inicialitzar l'activitat a partir de les seves dades
	 */
	this.init = function(canvas, activityData)
	{
		/** Inicialitzar el canvas **/
		canvasWidth  = canvas.width;
		canvasHeight = canvas.height;
		context = canvas.getContext("2d");
		w=100; h=100;
		
		/** Agafem les dades del fitxer data.js **/
		
		dist = activityData.atributsActivitat['layout-position'];
		
		colorhidden = activityData.celllist[0].cell[0].atributs['style-color-inactive'];
		if (!colorhidden) colorhidden = "#00000";
		colorhidden = "#"+colorhidden.replace(control,"");
		
		colorfonsbaix = activityData.atributsActivitat['settings-container-gradient-dest'];
		if (!colorfonsbaix) colorfonsbaix = "#00000";
		colorfonsbaix = "#"+colorfonsbaix.replace(control,"");
		
		colorfonsalt = activityData.atributsActivitat['settings-container-gradient-source'];
		if (!colorfonsalt) colorfonsalt = "#00000";
		colorfonsalt = "#"+colorfonsalt.replace(control,"");
		
		gradiente = activityData.atributsActivitat['settings-container-gradient-angle'];
		
		margin = activityData.atributsActivitat['settings-margin'];
		
		background = activityData.atributsActivitat['settings-container-bgColor'];
		if (!background) background="#FFFFFF"; 
		background = "#"+background.replace(control,"");
		
		colorfonsjoc = activityData.atributsActivitat['settings-window-bgColor'];
		if (!colorfonsjoc) colorfonsjoc = "#00000";
		colorfonsjoc = "#"+colorfonsjoc.replace(control,"");
		
		colorlinies = activityData.celllist[0].atributs['style-color-border'];
		if (!colorlinies) colorlinies = "#00000";
		colorlinies = "#"+colorlinies.replace(control,"");
		
		reprodSo = activityData.cell[0].atributs['media-type'];
		reprodSoFi = activityData.cell[1].atributs['media-type'];
		
		arxiuSo = activityData.cell[0].atributs['media-file'];
		arxiuSoFi = activityData.cell[1].atributs['media-file'];
		
		colorFonsNoms = "FFFFFF";
		colorFonsNomsSota = "AAFFAA";
		
		/**
		 * A partir del layout-position calculem:
		 *	 w: amplada general
		 *	 h: al�ada general
		 *	 incrShowX: amplada pe�a
		 *	 incrShowY: al�ada pe�a
		 */
		if ((dist == "AB")||(dist == "BA")){
			lines=activityData.celllist[0].atributs.rows;
			cols=activityData.celllist[0].atributs.cols*2;
				
			incrShowY=(canvasHeight-24)/lines;
			aux=h-incrShowY;
			h=(canvasHeight-24);
			incrShowX=w-aux;
			w=incrShowX*cols;
			if(((w*cols)+24) > canvasWidth){
				w = 100;
				h = 100;
				incrShowX = (canvasWidth-24)/cols;
				aux = w - incrShowX;
				w = incrShowX*cols;
				incrShowY = h - aux;
				h = incrShowY * lines;
			}
			/*if(((h*lines)+24) > canvasHeight){
				w = 100;
				h = 100;
				incrShowY = (canvasHeight-24)/lines;
				aux = h - incrShowY;
				h = incrShowY*lines;
				incrShowX = w - aux;
				w = incrShowX * cols;
			}*/
		}
		if ((dist == "AUB")||(dist == "BUA")){
			lines=activityData.celllist[0].atributs.rows*2;
			cols=activityData.celllist[0].atributs.cols;
 
			incrShowX=(canvasWidth-24)/cols; 
			aux=w-incrShowX;
			w=(canvasWidth-24);
			incrShowY=h-aux;
			h=incrShowY*lines;
			//musculs SI , pirates NO
			/*if(((h*lines)+24) > canvasHeight){
				w = 100;
				h = 100;
				incrShowY = (canvasHeight-24)/lines;
				aux = h - incrShowY;
				h = incrShowY*lines;
				incrShowX = w - aux;
				w = incrShowX * cols;
			}*/
		}
		
		gridAx=(canvasWidth-w)/2;
		gridAy=(canvasHeight-h)/2;

		/**
		 * Carreguem les imatges a la array Peces.
		 */
		
		var id_img=0;
		var pecesPrimer = new Array();
		var numPrimer = activityData.celllist[0].cell.length; //noms
		var hihaText = activityData.celllist[0].cell[0].atributs.p;
		
		if (hihaText)
		{
			for(var i=0; i<numPrimer; i++)
			{
				var nomImage = activityData.celllist[0].cell[i].atributs.p;
				var novaPeca = new ImageAssociation(context, id_img, nomImage,incrShowX,incrShowY);
				novaPeca.setNumPeca(numPeca);
				novaPeca.setColor(colorFonsNoms);
				pecesPrimer.push(novaPeca);
				id_img++;
				numPeca++;	
			}
		}else{
			for(var i=0; i<numPrimer; i++)
			{
				var myImage = new Image();
				
				myImage.onload = function() {
					imageLoaded = true;
				};
	
				myImage.src = activityData.celllist[0].cell[i].atributs.image;
				var novaPecaImatges = new ImageMemory(context, id_img, myImage,incrShowX,incrShowY);
				novaPecaImatges.setNumPeca(numPeca);
				pecesPrimer.push(novaPecaImatges);
				id_img++;
				numPeca++;
			}
		}
		
		numPeca=1;
		var pecesSegon = new Array();
		var numSegon = activityData.celllist[1].cell.length; //fotos
		var hihaImatge = activityData.celllist[1].cell[0].atributs.image;
		
		if (hihaImatge)
		{
			for(var i=0; i<numSegon; i++)
			{
				var myImage = new Image();
				
				myImage.onload = function() {
					imageLoaded = true;
				};
	
				myImage.src = activityData.celllist[1].cell[i].atributs.image;
				var novaPecaImatges = new ImageMemory(context, id_img, myImage,incrShowX,incrShowY);
				novaPecaImatges.setNumPeca(numPeca);
				pecesSegon.push(novaPecaImatges);
				id_img++;
				numPeca++;
			}
		}else{
			for(var i=0; i<numSegon; i++)
			{
				var nomImage = activityData.celllist[1].cell[i].atributs.p;
				var novaPeca = new ImageAssociation(context, id_img, nomImage,incrShowX,incrShowY);
				novaPeca.setNumPeca(numPeca);
				novaPeca.setColor(colorFonsNomsSota);
				pecesSegon.push(novaPeca);
				id_img++;
				numPeca++;	
			}
		}
		
		/**
		 * Desordenem les peces.
		 */
		for (var o=0;o<numPrimer;o++){
			ordArray[o]=o;
		}
		for (var o=0;o<numSegon;o++){
			ordArrayImatges[o]=o;
		}
		
		theX = gridAx;
		theY = gridAy;
		var o = 0;
	    
		if ((dist == "AUB")||(dist == "BUA")){
			for(var c=2; c<=lines; c++){
				for(var i=0;i<cols;i++){ 
		        	x[o]=theX;
		        	y[o]=theY;
		        	theX += incrShowX;
		            o++;
			    }
				theX = gridAx;
				theY += incrShowY;
			}
		}else{
			for(var c=2; c<=cols; c++){
				for(var i=0;i<lines;i++){ 
		        	x[o]=theX;
		        	y[o]=theY;
		        	theY += incrShowY;
		            o++;
			    }
				theY = gridAy;
				theX += incrShowX;
			}
		}
		ordArray.sort( randOrd );
		for (var o=0;o<pecesPrimer.length;o++){
			pecesPrimer[o].setPosx(x[ordArray[o]]);
			pecesPrimer[o].setPosy(y[ordArray[o]]);
		}
		
		if ((dist == "AUB")||(dist == "BUA")){
			theX = gridAx;
			theY = gridAy + (incrShowY*(lines/2));
			o=0;
			for(var c=2; c<=lines; c++){	
				for(var i=0;i<cols;i++){ 
		        	x[o]=theX;
		        	y[o]=theY;
		        	theX += incrShowX;
		            o++;
			    }
				theX = gridAx;
				theY += incrShowY;
			}
		}else{
			theX = gridAx + (incrShowX*(cols/2));
			theY = gridAy;
			o=0;
			for(var c=2; c<=cols; c++){
				for(var i=0;i<lines;i++){ 
		        	x[o]=theX;
		        	y[o]=theY;
		        	theY += incrShowY;
		            o++;
			    }
				theY = gridAy;
				theX += incrShowX;
			}
		}
		ordArrayImatges.sort( randOrd );
		for (var o=0;o<pecesSegon.length;o++){
			pecesSegon[o].setPosx(x[ordArrayImatges[o]]);
			pecesSegon[o].setPosy(y[ordArrayImatges[o]]);
		}
		
		/**
		 * Pintem el tauler de peces.
		 */
		grid = new Grid(context, lines, cols, {width:w,height:h}, {x:gridAx,y:gridAy}, {x:gridAx,y:gridAy});
		
		for (var o=0;o<pecesPrimer.length;o++){
			pecesPrimer[o].setHidden(false);
			myImages.add(pecesPrimer[o]);
		}
		for (var o=0;o<pecesSegon.length;o++){
			pecesSegon[o].setHidden(false);
			myImages.add(pecesSegon[o]);
		}
		/*
		if (reprodSo == "PLAY_AUDIO")
		{	
			soundManager.url = "./sound/swf/";
			soundManager.flashVersion = 9;
			soundManager.useFlashBlock = false;
			soundManager.onready(function() {
				soundManager.createSound(arxiuSo,arxiuSo);
				soundManager.createSound(arxiuSoFi,arxiuSoFi);
				soundManager.play(arxiuSo);
			});
		}*/
	};
	
	//Aqui dins va el codi de l'activitat
	this.run = function(){
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		segons++;
		context.strokeRect(gridAx,gridAy,w,h);
		
		if(DragData.active){
			if(frontImage=='none'){	
				frontImage=myImages.getFrontImage(DragData.startPosX, DragData.startPosY);
				if(frontImage!='notfound') frontImage.setDraggable();
			}
			if (DragData.currentPosX >= gridAx && DragData.currentPosX < gridAx+w && 
					DragData.currentPosY >= gridAy && DragData.currentPosY < gridAy+h){
				primerClic = true;
				if (segonClic==true && myImages.images[frontImage.id].colocada==false){
					idSegon = frontImage.id;
					numPrimer = myImages.images[idPrimer].numPeca;
					numSegon = myImages.images[idSegon].numPeca;
					
					tercerClic=true;
				}
			}
		}else{
			if (DragData.currentPosX >= gridAx && DragData.currentPosX < gridAx+w && 
					DragData.currentPosY >= gridAy && DragData.currentPosY < gridAy+h){
				if(tercerClic==true){
					if(numPrimer == numSegon &&  idPrimer != idSegon){
						myImages.images[idPrimer].setHidden(true);
						myImages.images[idSegon].setHidden(true);
						myImages.images[idPrimer].setColocada(true);
						myImages.images[idSegon].setColocada(true);
						colocades++;
						aciertos++;
					}
					segonClic = false;
					primerClic = false;
					tercerClic = false;
					idPrimer='none';
					idSegon='none';
					intentos++;
				}
				if(primerClic==true && myImages.images[frontImage.id].colocada==false){
					idPrimer = frontImage.id;
					segonClic = true;
				}
			}
			if(frontImage!='none'){
				if(frontImage!='notfound') frontImage.unsetDraggable();
				frontImage='none';
			}
			primerClic = false;
		}	
		
		//COMPROVAR ESTAT ACTIVITAT
		if(colocades==(numPeca-1)){
			this.acabat=true;
			/*if (reprodSoFi == "PLAY_AUDIO"){
				soundManager.play(arxiuSoFi);
				reprodSoFi = "false";
			}*/
		}
		
		//DRAW THE IMAGE
		if (!gradiente){
			grid.drawFons(background, 0, canvasWidth, canvasHeight, 0);
		}else{
			grid.drawFons(colorfonsalt, colorfonsbaix, canvasWidth, canvasHeight, gradiente);
		}
		grid.drawFonsJoc(colorfonsjoc, "0", margin);
		myImages.draw(colorFonsNoms);
		grid.draw(colorlinies);

		contextControl.fillStyle = "black";
		contextControl.font = "14pt Arial";
		tiempo = segons/20;
		tiempo = arrodonir(tiempo,0);
		
		if (android){
			contextControl.fillText(aciertos, 35, 250);
			contextControl.fillText(intentos, 35, 300);
			contextControl.fillText(tiempo, 30, 350);
		}else{
			contextControl.fillText(aciertos, 890, 60);
			contextControl.fillText(intentos, 940, 60);
			contextControl.fillText(tiempo, 990, 60);
		}
		
		if(segonClic){
			context.lineWidth = "5.0";
			context.strokeRect(myImages.images[idPrimer].posx,myImages.images[idPrimer].posy,incrShowX,incrShowY);
			context.lineWidth = "1.0";
		}
		
	};
	
	//Aquest funcio s'ha de cridar un cop s'ha acabat l'activitat i es canvia a una altra
	this.end = function() {
		delete(grid);
		//Aqui hauriem d'alliberar la memoria de les imatges (si es pot)
		return;
	};
}

>>>>>>> ebf020762f926b63351af8cb0c9882285037d494
