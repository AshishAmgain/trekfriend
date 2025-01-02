import React from 'react';
import ebc from '../../Assets/ebc.jpg';
import fewa from '../../Assets/fewa2.jpg';
import manaslu from '../../Assets/1.jpg';
import rara from '../../Assets/rara.jpg';
import Footer from '../../components/Footer';
import '../../CSS/Blog.css';

const Blog = () => {
  const blogs = [
    {
      title: 'Everest: The Roof of the World',
      date: '08-11-2021',
      category: 'Category',
      image: ebc,
      description:
        'Rising to 8,848.86 meters, Mount Everest is Earth’s highest peak and a dream destination for climbers. It symbolizes human resilience and unmatched trekking experiences.',
      link: 'https://en.wikipedia.org/wiki/Mount_Everest',
    },
    {
      title: 'Dhorpatan: Nepal’s Wild Frontier',
      date: '08-11-2021',
      category: 'Category',
      image: rara,
      description:
        'Spanning 1,325 sq. km, Dhorpatan Hunting Reserve is a unique blend of adventure and conservation, featuring breathtaking landscapes and rare wildlife.',
      link: 'https://en.wikipedia.org/wiki/Dhorpatan_Hunting_Reserve',
    },
  ];

  const sideBlogs = [
    {
      title: 'Annapurna Circuit',
      date: '08-11-2024',
      category: 'Category',
      image: fewa,
      link: 'https://en.wikipedia.org/wiki/Annapurna_Circuit',
    },
    {
      title: 'Everest Region',
      date: '08-11-2024',
      category: 'Category',
      image: manaslu,
      link: 'https://en.wikipedia.org/wiki/Everest_Region',
    },
    {
      title: 'Things to remember before camping',
      date: '08-11-2024',
      category: 'Category',
      image: ebc,
      link: 'https://en.wikipedia.org/wiki/Camping',
    },
  ];

  return (
    <>
      <div className="blog-container">
        <h1 className="blog-title">Our Latest Blog Posts</h1>
        <div className="blog-main-content">
          <div className="blog-list">
            {blogs.map((blog, index) => (
              <div key={index} className="blog-card">
                <img src={blog.image} alt={blog.title} className="blog-image" />
                <div className="blog-details">
                  <span className="blog-date">{blog.date}</span>
                  <span className="blog-category">{blog.category}</span>
                  <h2 className="blog-heading">{blog.title}</h2>
                  <p className="blog-description">{blog.description}</p>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-read-more"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="blog-sidebar">
            {sideBlogs.map((blog, index) => (
              <a
                key={index}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-blog-link"
              >
                <div className="sidebar-blog-card">
                  <img src={blog.image} alt={blog.title} className="sidebar-blog-image" />
                  <div className="sidebar-blog-info">
                    <span className="sidebar-blog-date">{blog.date}</span>
                    <span className="sidebar-blog-category">{blog.category}</span>
                    <p className="sidebar-blog-title">{blog.title}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
