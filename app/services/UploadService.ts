class UploadService {
  api = useApi();
  async uploadImage(file: File, folder?: string) {
    const form = new FormData();
    form.append("file", file);
    if (folder) {
      form.append("folder", folder);
    }
    return await this.api({
      method: "POST",
      url: "file/upload",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
    });
  }
}

export default new UploadService();