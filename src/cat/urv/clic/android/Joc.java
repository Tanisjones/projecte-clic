package cat.urv.clic.android;

import java.util.Date;
import java.util.List;

public class Joc {

	enum idioma{ alemany, angles, arauca, basc, calo, catala, espanyol, esperanto, frances, gallec, grec, italia,
		llati, occita, portugues, rumanes, suec, xines }
	enum nivell { infantil, primaria, secundaria, batxillerat }
	enum area { llengues, matematiques, cienciesSocials, cienciesExperimentals, musica, visualIplastica, educacioFisica,
		tecnologies, diversos }
	
	private Integer identificador;
	private String nom;
	private Date dataPublicacio;
	private List<String> llengua;
	private List<String> nivellJoc;
	private List<String> areaJoc;
	private Boolean descarregat;
	private String ruta;
	private String clic;
	private String img;
	private String centre;
	private String autors;
     	
	
	public Joc (Integer identificador, String nom, Date dataPublicacio,List<String> llengua, List<String> nivellJoc, 
			List<String> areaJoc, String ruta, String clic, String img, String centre, String autors,
			Boolean descarregat) {
		this.identificador = identificador;
		this.nom = nom;
		this.dataPublicacio = dataPublicacio;	// Format de la data ANY-MES-DIA i separat amb guions
		this.llengua = llengua;
		this.nivellJoc = nivellJoc;
		this.areaJoc = areaJoc;
		this.descarregat = false;    // Es cert si el joc esta descarregat al mobil.
		this.ruta = ruta;		 
		this.clic = clic;		 	// Path d'on es trobara l'arxiu del joc comprimit.
		this.img = img;		 
		this.centre = centre;		 
		this.autors = autors;		 
		this.descarregat = descarregat;
	}
	
	public Boolean getDescarregat() {
		return descarregat;
	}	
	public void setDescarregat(Boolean descarregat) {
		this.descarregat = descarregat;
	}
	public Integer getIdentificador() {
		return identificador;
	}
	public String getNom() {
		return nom;
	}
	public Date getDataPublicacio() {
		return dataPublicacio;
	}
	public List<String> getLlengua() {
		return llengua;
	}
	public List<String> getNivellJoc() {
		return nivellJoc;
	}
	public List<String> getAreaJoc() {
		return areaJoc;
	}
	public String getRuta() {
		return ruta;
	}
	public String getClic() {
		return clic;
	}
	public String getImg() {
		return img;
	}
	public String getCentre() {
		return centre;
	}
	public String getAutors() {
		return autors;
	}
}
