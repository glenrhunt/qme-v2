<?
class PlacesController extends AppController {
  public $name = 'Place';
  
  public function beforeFilter() {
    $this->layout = 'ajax';
  }
  
  public function create() {    
    if($this->request->is('post')) {
      $data = $this->request->data;
      $data['Place']['height'] = 40;
      $data['Place']['width'] = 40;
      if($place = $this->Place->save($data)) {
        $model = $this->Place->Qmodel->findById($place['Place']['qmodel_id']);
        $short_name = $model['Qmodel']['short_name'];
        $this->alertSuccess('Success!', sprintf('Successfully created ' . 
          '<strong>%s</strong>.', $place['Place']['name']), true);
        $this->redirect(array('controller'=>'qmodels',
          'action'=>'view', 'short_name'=>$short_name));        
      }
    }
  }
  
  public function update() {
    $this->layout = 'ajax';
    if($this->request->is('post') &&
      $place = $this->Place->save($this->request->data)) {
      $model = $this->Place->Qmodel->findById($place['Place']['qmodel_id']);
      $short_name = $model['Qmodel']['short_name'];
      $this->redirect(array('controller'=>'qmodels',
        'action'=>'view', 'short_name'=>$short_name));
    } else {
      echo 'FAILURE. :(';
    }
  }
  
  public function delete($id = null) {
    $this->Place->id = $id;
    $place = $this->Place->read();
    $model = $this->Place->Qmodel->findById($place['Place']['qmodel_id']);
    $short_name = $model['Qmodel']['short_name'];        
    $this->Place->delete($id);
    $this->alertSuccess('Success!', sprintf('Successfully deleted ' . 
      '<strong>%s</strong>.', $place['Place']['name']), true);
    $this->redirect(array('controller'=>'qmodels', 'action'=>'view',
      'short_name'=>$short_name));
  }
}
?>