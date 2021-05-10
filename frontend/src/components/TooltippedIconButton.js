import { IconButton, Tooltip } from "@material-ui/core";

const TooltippedIconButton = ({ title, action, icon, disabled }) => {
  return (
    <Tooltip title={title}>
      <IconButton aria-label={title} onClick={action} disabled={disabled}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export default TooltippedIconButton;