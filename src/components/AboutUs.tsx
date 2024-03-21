const AboutUs = () => {
  return (
    <div style={styles.container}>
      {/* @ts-ignore */}
      <h2 style={styles.title}>About Us</h2>
      <div style={styles.content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non mi
          sed dui tincidunt pharetra. Vivamus id eleifend lacus. Cras auctor
          massa ac dolor fringilla, a facilisis dui ultricies. Proin dapibus
          urna in sapien consectetur, non tincidunt quam blandit.
        </p>
        <p>
          Donec bibendum mauris sit amet ante dapibus, at blandit risus
          faucibus. Aliquam erat volutpat. Duis vehicula, arcu nec gravida
          condimentum, ligula mauris suscipit magna, et hendrerit libero quam
          non ex. Quisque luctus vehicula odio, in laoreet lorem fermentum ac.
        </p>
        <p>
          Phasellus nec diam nunc. Fusce eu magna nec nulla tincidunt cursus.
          Curabitur aliquam dolor eget lorem hendrerit, id congue mauris
          tristique. Vestibulum vel lobortis odio, id viverra nisl.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "green",
    textAlign: "center",
    marginBottom: "20px",
  },
  content: {
    color: "black",
    lineHeight: "1.6",
  },
};

export default AboutUs;
