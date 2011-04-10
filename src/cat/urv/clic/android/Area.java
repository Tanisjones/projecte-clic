package cat.urv.clic.android;

import java.util.Hashtable;

public class Area {

	private Hashtable<String, String> arees;
	private String[] nomsArees;			// Taula que ens servir� per tenir la llista de noms ORDENADA 
	
	public Area() {
		arees = new Hashtable<String, String>();
		nomsArees = new String[10];
	}
	
	public String[] getNomsArees() {
		return nomsArees;
	}

	public void afegirTotesArees(){
		this.arees.put("tot", "Totes les �rees");
		this.arees.put("lleng", "lleng�es");
		this.arees.put("mat", "matem�tiques");		
		this.arees.put("soc", "ci�ncies socials");
		this.arees.put("exp", "ci�ncies experimentals");		
		this.arees.put("mus", "m�sica");
		this.arees.put("vip", "visual i pl�stica");
		this.arees.put("ef", "educaci� f�sica");		
		this.arees.put("tec", "tecnologies");		
		this.arees.put("div", "diversos");
		
		this.nomsArees[0] = "Totes les �rees";
		this.nomsArees[1] = "lleng�es";
		this.nomsArees[2] = "matem�tiques";
		this.nomsArees[3] = "ci�ncies socials";
		this.nomsArees[4] = "ci�ncies experimentals";		
		this.nomsArees[5] = "m�sica";		
		this.nomsArees[6] = "visual i pl�stica";
		this.nomsArees[7] = "educaci� f�sica";		
		this.nomsArees[8] = "tecnologies";		
		this.nomsArees[9] = "diversos";	

	}

	public String cercarIdArea(String nomArea){
		String idArea = null;        		
		for(String id: arees.keySet()){			
			if (arees.get(id).compareTo(nomArea) == 0)
				idArea = id;
		}		
		return idArea;
	}
	
	public String cercarNomArea(String id){
		return arees.get(id);
	}
}