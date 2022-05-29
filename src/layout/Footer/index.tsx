import { makeStyles } from "@material-ui/core/styles";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      Copyright © 2021 2084TEAM 千机平台
    </div>
  );
};

export default Footer;

const useStyles = makeStyles({
  container: {
    height: "50px",
    color: "#d3d7da",
    lineHeight: "50px",
    textAlign: "center",
    position: "relative",
    top: '100%',
    width:"100%"
  },
});