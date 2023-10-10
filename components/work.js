import styles from './work.module.css';

<script type="text/jsx">

  const app = document.getElementById("app")

function Work({ title, links, description }) {
return ( 
  <div className={styles.block}>
    <a href={`https://github.com/${links}`}>
        <h1>{title}</h1>
        <p>{description}</p>
    </a>
  </div>
);
}

function Works() {
  return (
    <div className={styles.blocks}>
      <Work links="hackclub/sprig" title="Sprig" description="I review games" />
    </div>
  );
}

ReactDOM.render(<Work />, <Works />, app);
</script>