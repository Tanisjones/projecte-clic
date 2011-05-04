package cat.urv.clic.android;

import java.util.Hashtable;

public class Idioma {

	private Hashtable<String, String> idiomes;
	private String[] nomsIdiomes;			// Taula que ens servir� per tenir la llista de noms ORDENADA 
	
	public Idioma() {
		idiomes = new Hashtable<String, String>();
		nomsIdiomes = new String[19];
	}
	
	public String[] getNomsIdiomes() {
		return nomsIdiomes;
	}

	public void afegirTotsIdiomes(){
		this.idiomes.put("tot", "Tots els idiomes");
		this.idiomes.put("de", "alemany");
		this.idiomes.put("en", "angl�s");
		this.idiomes.put("arn", "arauc�");
		this.idiomes.put("eu", "basc");
		this.idiomes.put("rmq", "cal�");
		this.idiomes.put("ca", "catal�");
		this.idiomes.put("es", "espanyol");		
		this.idiomes.put("eo", "esperanto");		
		this.idiomes.put("fr", "franc�s");
		this.idiomes.put("gl", "gallec");		
		this.idiomes.put("el", "grec");
		this.idiomes.put("it", "itali�");		
		this.idiomes.put("la", "llat�");
		this.idiomes.put("oc", "occit�");		
		this.idiomes.put("pt", "portugu�s");		
		this.idiomes.put("ro", "roman�s");		
		this.idiomes.put("sv", "suec");
		this.idiomes.put("zh", "xin�s");
		
		this.nomsIdiomes[0] = "Tots els idiomes";
		this.nomsIdiomes[1] = "alemany";
		this.nomsIdiomes[2] = "angl�s";
		this.nomsIdiomes[3] = "arauc�";
		this.nomsIdiomes[4] = "basc";		
		this.nomsIdiomes[5] = "cal�";		
		this.nomsIdiomes[6] = "catal�";
		this.nomsIdiomes[7] =  "espanyol";		
		this.nomsIdiomes[8] =  "esperanto";		
		this.nomsIdiomes[9] =  "franc�s";
		this.nomsIdiomes[10] =  "gallec";		
		this.nomsIdiomes[11] =  "grec";
		this.nomsIdiomes[12] =  "itali�";		
		this.nomsIdiomes[13] = "llat�";
		this.nomsIdiomes[14] =  "occit�";		
		this.nomsIdiomes[15] =  "portugu�s";		
		this.nomsIdiomes[16] =  "roman�s";		
		this.nomsIdiomes[17] =  "suec";
		this.nomsIdiomes[18] =  "xin�s";
	}

	public String cercarIdIdioma(String nomIdioma){
		String idIdioma = null;        		
		for(String id: idiomes.keySet()){			
			if (idiomes.get(id).compareTo(nomIdioma) == 0)
				idIdioma = id;
		}		
		return idIdioma;
	}
	
	public String cercarNomIdioma(String id){
		return idiomes.get(id);
	}
}
