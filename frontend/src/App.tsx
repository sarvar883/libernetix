// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './App.css';

import PaymentForm from './components/payment-form';

function App() {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-8 mx-auto">
          <PaymentForm />
        </div>
      </div>
    </div>
  )
}

export default App;