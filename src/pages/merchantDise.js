import axios from 'axios';
import React from 'react';
// import { withRouter } from 'react-router-dom';
// import styles from './App.module.scss';
class MerchantDise extends React.Component {
  state = {
      data: []
  }

  async componentDidMount () {

      /*const corsUrl = 'https://cors-anywhere.herokuapp.com/'
      const sourceUrl = 'https://itunes.apple.com/search?term=twice&limit=20&media=music'
      const url = corsUrl + sourceUrl*/
      const url = "http://localhost:5000/merchantdise";

      // fetch
      // const data = await fetch('https://randomuser.me/api/', {}).then(res =>  res.json())
      // if (data) {
      //     this.setState({data: data.results[0].name.first})
      // }
      
      // //axios
      const result = await axios(url)
      var resString = ""
      if ( result && result.data) {
        result.data.map(el => {
        //   const {artistName, collectionName, collectionViewUrl, artworkUrl100} = el;
        const {name, color, description, filename} = el;
        // console.log("filename: ", filename);
          resString += `
            <div class="card">
             <div class="name">
              <p>商品名稱: ${name}</p>
              <p>商品描述: ${description}</p>
              <p>商品顏色: ${color}</p>
              <div class="image">
                <img src="/photo/${filename}"/>
              </div>
            </div>
            </div>`
        })
        this.setState({data: resString})
      }
  }

  render() {
      const { data } = this.state
      return (
          // <div>
          //     { data }
          // </div>
          <div dangerouslySetInnerHTML={{ __html: data }}></div>          
      );
  }
}

const App = (props) => {
  return (
    <div className="AP">
      <MerchantDise/>
    </div>
  );
}

// export default withRouter(App);
export default App;
