import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PostItem from './components/PostItem';
import Sidebar from './components/Sidebar';


function Homepage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/posts/');
            setData(response.data);
            console.log(response.data)
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
    }, []);
    return (
        <div className='container'>
          <div className='row mb-5'>
            <div className='posts row col-lg-8'>
              {
                  data.map((item) => (
                      <PostItem key={item.id}
                        class='col-sm-6'
                        links={'/categories/' + item.category[0].slug + '/' + item.slug}
                        subLinks={"/subcategories/" + (item.subcategory[0]?.slug || '') + "/" + item.slug}
                        date={item.formatted_added_time}
                        content_1={item.content_1}
                        image_1={item.image_1}
                        content_2={item.content_2}
                        image_2={item.image_2}
                        content_3={item.content_3}
                        image_3={item.image_3}
                        slug={item.slug}
                        category={item.category[0].title}
                        categorySlug={item.category[0].slug}
                        title={item.title}
                        tags={item.tags}
                      />
                  ))
              }
            </div>
            <div className='col-lg-4'>
              <Sidebar/>
            </div>
        </div>
        </div>
    )
}

export default Homepage