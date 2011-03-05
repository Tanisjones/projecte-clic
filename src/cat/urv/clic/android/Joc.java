package cat.urv.clic.android;

import java.util.Date;
import java.util.List;

public class Joc {

	enum idioma{ alemany, angles, arauc�, basc, cal�, catal�, espanyol, esperanto, franc�s, gallec, grec, itali�,
		llat�, occit�, portugu�s, ruman�s, suec, xin�s }
	enum nivell { infantil, primaria, secundaria, batxillerat }
	enum area { llengues, matematiques, cienciesSocials, cienciesExperimentals, musica, visualIplastica, educacioFisica,
		tecnologies, diversos }
	
	private Integer identificador;
	private String nom;
	private Date dataPublicacio;
	private List<idioma> llengua;
	private nivell nivellJoc;
	private List<area> areaJoc;
	private Boolean descarregat;
	private String enlla�;
	
	public Joc (Integer identificador, String nom, Date dataPublicacio,List<idioma> llengua, nivell nivellJoc, 
			List<area> areaJoc, String enlla�) {
		this.identificador = identificador;
		this.nom = nom;
		this.dataPublicacio = dataPublicacio;
		this.llengua = llengua;
		this.nivellJoc = nivellJoc;
		this.areaJoc = areaJoc;
		this.descarregat = false;    // �s cert si el joc est� descarregat al m�bil.
		this.enlla� = enlla�;		 // Path d'on es trobar� l'arxiu del joc comprimit.
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
	public nivell getNivellJoc() {
		return nivellJoc;
	}
	public List<area> getAreaJoc() {
		return areaJoc;
	}
	public String getEnlla�() {
		return enlla�;
	}
	
}
