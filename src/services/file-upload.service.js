import http from "../http-common";

  class FileUploadService {
    upload(file, onUploadProgress) {
      let formData = new FormData();

      formData.append("file", file);

      return http.post("/upload", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
        },
        onUploadProgress,
      });
    }

    getFiles() {
      return http.get("/files");
    }
}

export default new FileUploadService();