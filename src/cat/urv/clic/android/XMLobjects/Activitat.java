package cat.urv.clic.android.XMLobjects;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Activitat implements RecursiuXML {

	protected List<CellList> celllist; //Guarda llista de cel.les
	protected List<Cell> cell; //Guarda cel.les sueltes, com per exemple la inicial i la final
	protected HashMap<String, Object> atributsActivitat;

	public Activitat() {
		this.atributsActivitat = new HashMap<String, Object>();
		this.celllist = new ArrayList<CellList>();
		this.cell = new ArrayList<Cell>();
	}

	public void afegirAtribut(String clau, Object valor){
<<<<<<< HEAD
		if (clau=="class") { clau="classe"; }
=======
		// Canviem els class per classe perqu� la part de l'HTML5 no tingui
		// problemes al llegir-ho
		if (clau == "class"){
			clau = "classe";
		}
>>>>>>> ebf020762f926b63351af8cb0c9882285037d494
		this.atributsActivitat.put(clau, valor);
	}
	
	public void afegirCells(CellList celllist){
		this.celllist.add(celllist);
	}

	public void afegirCell(Cell cell){
		this.cell.add(cell);
	}
}
