package cat.urv.clic.android;

import android.app.ListActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;


public class LlistaClics extends ListActivity {

    private String[] fruits = new String[]{"Orange", "Apple", "Pear"}; 
    private ArrayAdapter<String> adp; 
    
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	super.onCreate(savedInstanceState);

        adp = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,fruits); 
    	setListAdapter(adp);
    	
    }
    
}
