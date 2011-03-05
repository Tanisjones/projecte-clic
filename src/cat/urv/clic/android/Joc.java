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
	private List<idioma> llengua;
	private List<nivell> nivellJoc;
	private List<area> areaJoc;
	private Boolean descarregat;
	private String ruta;
	
	public Joc (Integer identificador, String nom, Date dataPublicacio,List<idioma> llengua, List<nivell> nivellJoc, 
			List<area> areaJoc, String ruta) {
		this.identificador = identificador;
		this.nom = nom;
		this.dataPublicacio = dataPublicacio;
		this.llengua = llengua;
		this.nivellJoc = nivellJoc;
		this.areaJoc = areaJoc;
		this.descarregat = false;    // �s cert si el joc est� descarregat al m�bil.
		this.ruta = ruta;		 // Path d'on es trobar� l'arxiu del joc comprimit.
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
	public List<idioma> getLlengua() {
		return llengua;
	}
	public List<nivell> getNivellJoc() {
		return nivellJoc;
	}
	public List<area> getAreaJoc() {
		return areaJoc;
	}
	public String getRuta() {
		return ruta;
	}
	
}