<div className="flex justify-center lg:justify-start mb-1">
                <div className="responsive">
                  <label htmlFor="fotografia" className="label">
                    Fotografías:
                  </label>
                  {loading ? (
                    <h2>Cargando imágenes...</h2>
                  ) : images.length > 0 ? (
                    <div className="grid grid-cols-3">
                      {images.map((img, index) => (
                        <div key={index}>
                          <img
                            src={img}
                            alt={`Imagen ${index + 1}`}
                            style={{
                              width: "125px",
                              height: "70px",
                              backgroundSize: "cover",
                              paddingRight: "15px",
                            }}
                          />
                          <button onClick={() => handleDeleteImage(index)}>
                            Eliminar imagen
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Dropzone className="dropzone" onDrop={handleDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <p>Cargar imágenes</p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  )}
                </div>
              </div>