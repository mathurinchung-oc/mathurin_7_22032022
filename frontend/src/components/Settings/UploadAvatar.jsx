import { FormControl, FormUpload } from "../Form";

function UploadAvatar({ change }) {
  return (
    <FormControl>
      <FormUpload id="avatar" change={ change } />
      <input type="reset" />
    </FormControl>
  );
};

export default UploadAvatar;
