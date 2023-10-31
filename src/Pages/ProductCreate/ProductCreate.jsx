// import React from "react";
import { DatePicker, Input, Select, Upload } from "antd";
import TopBar from "../../Components/TopBar/TopBar";
import "./ProductCreate.css";
import LinkIcon from "../../assets/Icons/LinkIcon.svg";
import uploadImg from "../../assets/Icons/uploadImageIcon.svg";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";

const ProductCreate = () => {
  return (
    <div>
      <TopBar pageTitle="Add New Product" />
      <section>
        {/* start product section */}
        <div className="product-create-main-section">
          {/* product create 70% width*/}
          <div className="product-create-main-section-child">
            {/* product create search section */}
            <div className="product-create-api-search-section">
              <p>
                {" "}
                <img src={LinkIcon} alt="" /> Enter your API URL
              </p>
              <Input placeholder="Paste URL here" />
            </div>
            <div className="product-create-input-section-head">
              <div>
                <h3>Product deal information</h3>
              </div>
              {/* start products details input from here */}

              <form className="product-create-input-section">
                <div>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    // beforeUpload={beforeUpload}
                    // onChange={handleChange}
                  >
                    {uploadImg ? (
                      <img
                        src={uploadImg}
                        alt="avatar"
                        style={{
                          width: "100%",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
                <div>
                  <p>Product Title</p>
                  <Input placeholder="Type post title" />
                </div>
                <div>
                  <p>Selec Brand</p>
                  <Select className="product-create-input-section-select-option">
                    <Option>Testing</Option>
                  </Select>
                </div>
                <div>
                  <p>Selec Store</p>
                  <Select className="product-create-input-section-select-option">
                    <Option>Testing</Option>
                  </Select>
                </div>
                <div>
                  <p>Affiliate Link</p>
                  <Input placeholder="Link" />
                </div>
                <div>
                  <p>Selec Category</p>
                  <Select className="product-create-input-section-select-option">
                    <Option>Testing</Option>
                  </Select>
                </div>
                <div>
                  <p>Selec Country</p>
                  <Select className="product-create-input-section-select-option">
                    <Option>Testing</Option>
                  </Select>
                </div>
                <div>
                  <p>Expire Date</p>
                  <DatePicker className="product-create-input-section-select-option" />
                </div>
                <div>
                  <p>Selec Campaign</p>
                  <Select className="product-create-input-section-select-option">
                    <Option>Testing</Option>
                  </Select>
                </div>
                <div>
                  <div className="product-create-input-section-price">
                    <div>
                      <p>Old Price</p>
                      <Input placeholder="Old Price" />
                    </div>
                    <div>
                      <p>Discount Price</p>
                      <Input placeholder="Discount Price" />
                    </div>
                  </div>
                </div>
                <div>
                  <TextArea className="product-create-input-section-text-aria"></TextArea>
                </div>
              </form>
            </div>
          </div>

          {/* product preview  30% width*/}
          <div className="product-create-main-section-child">
            <div>
              <h3>Preview</h3>

              <div className="product-create-preview-section">
                <p>Here come the big dog</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCreate;
