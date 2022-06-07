import { FormControl, FormUpload } from "../Form";

function UploadAvatar({ change }) {
  return (
    <FormControl>
      <FormUpload id="avatar" change={ change } />
    </FormControl>
  );
};

export default UploadAvatar;
