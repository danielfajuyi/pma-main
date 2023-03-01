

const About = ({user}) => {
    return (
      <div>
          <div className='about'>
              <h2>About Brand</h2>
              <p>{user?.client?.bio}</p> <br />
              {/* <p>we are focused on promoting and creating awareness for models</p> */}
              </div>
              <div className='industry'>
              <h2>Industry</h2>
              <p>{user?.client?.industry}</p>
              </div>
      </div>
    )
  }
  
  export default About