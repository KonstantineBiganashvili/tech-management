import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { withOutToken } from '../../services/APIServices';
import { Link, useNavigate } from 'react-router-dom';
import { postMethod } from '../../services/APIServices';
import { FaArrowLeft } from 'react-icons/fa';
import { AiFillWarning } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import './addSpecs.css';
import { validLaptopName } from '../../helpers/validators';
import Header from '../Header';
import Select from '../Select';
import Success from '../Success';
import HeaderResponsive from '../HeaderResponsive';

const AddSpecs = () => {
  const [specsInfo, setSpecsInfo] = useState(
    JSON.parse(localStorage.getItem('laptopSpecs')) || {
      laptop_name: '',
      laptop_image_base64: '',
      laptop_brand_id: '',
      laptop_cpu: '',
      laptop_cpu_cores: '',
      laptop_cpu_threads: '',
      laptop_ram: '',
      laptop_hard_drive_type: '',
      laptop_state: '',
      laptop_purchase_date: '',
      laptop_price: '',
    }
  );
  const [laptopImg, setLaptopImg] = useState(
    JSON.parse(localStorage.getItem('laptopImg')) || {
      laptop_image: [],
      laptop_image_base64: '',
    }
  );
  const [showModal, setShowModal] = useState(false);
  const [laptopBrands, setLaptopBrands] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', getWidth);

    console.log(width);

    return () => {
      window.removeEventListener('resize', getWidth);
    };
  }, [width]);

  useEffect(() => {
    const brandsList = async () => {
      const brandsData = await withOutToken('GET', 'brands');
      setLaptopBrands(brandsData.data);
    };

    const cpusList = async () => {
      const cpusData = await withOutToken('GET', 'cpus');
      setCpus(cpusData.data);
    };

    brandsList();
    cpusList();
  }, []);

  useEffect(() => {
    localStorage.setItem('laptopSpecs', JSON.stringify(specsInfo));

    setErrors({});
  }, [specsInfo]);

  useEffect(() => {
    localStorage.setItem('laptopImg', JSON.stringify(laptopImg));

    setErrors({});
  }, [laptopImg]);

  useEffect(() => {
    const laptopImgInfo = JSON.parse(localStorage.getItem('laptopImg'));
    const base64 = laptopImgInfo.laptop_image_base64;

    const urltoFile = async (url, filename, mimeType) => {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], filename, { type: mimeType });
    };

    urltoFile(base64, 'laptop.jpeg', 'image/*').then((file) => {
      setLaptopImg((oldData) => ({
        ...oldData,
        laptop_image: file,
      }));
    });
  }, []);

  const laptopsOptions = laptopBrands.map((laptop) => {
    return (
      <Select key={laptop.id} value={laptop.id} selectName={laptop.name} />
    );
  });

  const cpuOptions = cpus.map((cpu) => {
    return <Select key={cpu.id} value={cpu.name} selectName={cpu.name} />;
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);

      reader.addEventListener('load', () => {
        setLaptopImg({
          laptop_image_base64: reader.result,
          laptop_image: acceptedFiles[0],
        });
      });
    },
  });

  const handleCancel = () => {
    setLaptopImg((oldInfo) => ({
      ...oldInfo,
      laptop_image: [],
      laptop_image_base64: '',
    }));
  };

  const handleStateChange = (name, inputValue) => {
    setSpecsInfo((oldSpecsInfo) => ({
      ...oldSpecsInfo,
      [name]: inputValue,
    }));
  };

  const handleSubmit = () => {
    const errorsObject = {};

    if (!specsInfo.laptop_name.trim()) {
      errorsObject.laptopNameError = 'ლეპტოპის სახელი არ უნდა იყოს ცარიელი';
    }

    if (!laptopImg.laptop_image_base64.trim()) {
      errorsObject.laptopImageError = 'სურათის ატვირთვა აუცილებელია';
    }

    if (!validLaptopName(specsInfo.laptop_name)) {
      errorsObject.laptopNameError =
        'შესაძლებელია შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, რიცხვებსა და !@#$%^&()_+=';
    }

    if (!specsInfo.laptop_brand_id.trim()) {
      errorsObject.brandError = 'აირჩიეთ ბრენდი';
    }

    if (!specsInfo.laptop_cpu.trim()) {
      errorsObject.cpuError = 'აირჩიეთ CPU';
    }

    if (!specsInfo.laptop_cpu_cores.trim()) {
      errorsObject.coresError = 'შეიყვანეთ ბირთვების რაოდენობა';
    }

    if (!specsInfo.laptop_cpu_threads.trim()) {
      errorsObject.threadsError = 'შეიყვანეთ ნაკადების რაოდენობა';
    }

    if (!specsInfo.laptop_ram.trim()) {
      errorsObject.ramError = 'შეიყვანეთ RAM-ის რაოდენობა';
    }

    if (!specsInfo.laptop_hard_drive_type.trim()) {
      errorsObject.storageError = 'აირჩიეთ მეხსიერების ტიპი';
    }

    if (!specsInfo.laptop_price.trim()) {
      errorsObject.priceError = 'შეივყანეთ ლეპტოპის ფასი';
    }

    if (!specsInfo.laptop_state.trim()) {
      errorsObject.stateError = 'აირჩიეთ მდგომარეობა';
    }

    if (Object.keys(errorsObject).length) {
      setErrors(errorsObject);
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const formData = new FormData();

      const finalInfo = {
        name: userInfo.name,
        surname: userInfo.surname,
        team_id: Number(userInfo.team),
        position_id: Number(userInfo.position),
        phone_number: `+${userInfo.number}`,
        email: userInfo.mail,
        token: '7bbb011efcb959c1a848307bcc39a10e',
        laptop_name: specsInfo.laptop_name,
        laptop_brand_id: Number(specsInfo.laptop_brand_id),
        laptop_image: laptopImg.laptop_image,
        laptop_cpu: specsInfo.laptop_cpu,
        laptop_cpu_cores: Number(specsInfo.laptop_cpu_cores),
        laptop_cpu_threads: Number(specsInfo.laptop_cpu_threads),
        laptop_ram: Number(specsInfo.laptop_ram),
        laptop_hard_drive_type: specsInfo.laptop_hard_drive_type,
        laptop_state: specsInfo.laptop_state,
        laptop_purchase_date: specsInfo.laptop_purchase_date,
        laptop_price: specsInfo.laptop_price,
      };

      for (let key in finalInfo) {
        formData.append(key, finalInfo[key]);
      }

      postMethod(formData);
      localStorage.clear();
      setSpecsInfo({
        laptop_name: '',
        laptop_image_base64: '',
        laptop_brand_id: '',
        laptop_cpu: '',
        laptop_cpu_cores: '',
        laptop_cpu_threads: '',
        laptop_ram: '',
        laptop_hard_drive_type: '',
        laptop_state: '',
        laptop_purchase_date: '',
        laptop_price: '',
      });
      setLaptopImg({
        laptop_image: [],
        laptop_image_base64: '',
      });
      setShowModal(true);
    }
  };

  return (
    <div id="addSpecsInfo">
      <Link to="/">
        <FaArrowLeft id="backButton" />
      </Link>
      {width > 390 ? (
        <Header activeSpecs={true} activeUserInfo={false} />
      ) : (
        <HeaderResponsive text="ლეპტოპის მახასიათებლები" page="2" />
      )}
      <div className="inputFields">
        {laptopImg.laptop_image_base64.length > 0 ? (
          <div id="uploadedImg">
            <img
              src={laptopImg.laptop_image_base64}
              alt="laptop.img"
              id="laptopImgToSend"
            />
            <GiCancel onClick={handleCancel} id="cancelIcon" />
          </div>
        ) : (
          <div id="uploadImgField" {...getRootProps()}>
            {errors.laptopImageError ? (
              <div id="warning">
                <AiFillWarning id="warningSign" />
                <p id="errorText">{errors.laptopImageError}</p>
              </div>
            ) : (
              <p id="imgUploadTxt">ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
            )}
            <p id="uploadImgLabel">ატვირთე</p>
            <input
              id="uploadImgInput"
              name="uploadImgInput"
              {...getInputProps()}
            />
          </div>
        )}

        <div className="inputGroups">
          <div id="laptopNameField">
            <label htmlFor="laptopNameInput">ლეპტოპის სახელი</label>
            <input
              type="text"
              id="laptopNameInput"
              name="laptopNameInput"
              value={specsInfo.laptop_name}
              onInput={({ target }) =>
                handleStateChange('laptop_name', target.value)
              }
            />
            {errors.laptopNameError ? (
              <p className="errorText">{errors.laptopNameError}</p>
            ) : (
              <p className="additionalInfo">
                შესაძლებელია შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, რიცხვებსა და
                !@#$%^&*()_+=
              </p>
            )}
          </div>
          <div className="specsSelects">
            <select
              value={specsInfo.laptop_brand_id || 'brand'}
              id="selectBrands"
              onChange={({ target }) =>
                handleStateChange('laptop_brand_id', target.value)
              }
            >
              <option value="brand" disabled hidden>
                ბრენდი
              </option>
              {laptopsOptions}
            </select>
            {errors.brandError && (
              <p className="errorText">{errors.brandError}</p>
            )}
          </div>
        </div>
        <hr style={{ width: '100%' }} />
        <div className="inputGroups">
          <div id="cpuInfo">
            <div>
              <select
                value={specsInfo.laptop_cpu || 'CPU'}
                id="selectCpus"
                onChange={({ target }) =>
                  handleStateChange('laptop_cpu', target.value)
                }
              >
                <option value="CPU" disabled hidden>
                  CPU
                </option>
                {cpuOptions}
              </select>
              {errors.cpuError && (
                <p className="errorText">{errors.cpuError}</p>
              )}
            </div>
            <div id="cpuCoresField">
              <label htmlFor="cpuCoresInput">CPU-ს ბირთვი</label>
              <input
                type="number"
                id="cpuCoresInput"
                name="cpuCoresInput"
                value={specsInfo.laptop_cpu_cores}
                onInput={({ target }) =>
                  handleStateChange('laptop_cpu_cores', target.value)
                }
              />
              {errors.coresError ? (
                <p className="errorText">{errors.coresError}</p>
              ) : (
                <p className="additionalInfo">მხოლოდ ციფრები</p>
              )}
            </div>
            <div id="cpuThreadsField">
              <label htmlFor="cpuThreadsInput">CPU-ს ნაკადი</label>
              <input
                type="number"
                id="cpuThreadsInput"
                name="cpuThreadsInput"
                value={specsInfo.laptop_cpu_threads}
                onInput={({ target }) =>
                  handleStateChange('laptop_cpu_threads', target.value)
                }
              />
              {errors.threadsError ? (
                <p className="errorText">{errors.threadsError}</p>
              ) : (
                <p className="additionalInfo">მხოლოდ ციფრები</p>
              )}
            </div>
          </div>
        </div>
        <div className="inputGroups">
          <div id="ramField">
            <label htmlFor="ramInput">ლეპტოპის RAM (GB)</label>
            <input
              type="number"
              id="ramInput"
              name="ramInput"
              value={specsInfo.laptop_ram}
              onInput={({ target }) =>
                handleStateChange('laptop_ram', target.value)
              }
            />
            {errors.ramError ? (
              <p className="errorText">{errors.ramError}</p>
            ) : (
              <p className="additionalInfo">მხოლოდ ციფრები</p>
            )}
          </div>

          <div id="storageRadioBtns">
            <p>მეხსიერების ტიპი</p>
            <div className="radioBtnsGroup">
              <div className="radioBtn">
                <input
                  type="radio"
                  name="storageType"
                  id="SSD"
                  value="SSD"
                  onChange={({ target }) =>
                    handleStateChange('laptop_hard_drive_type', target.value)
                  }
                />
                <label htmlFor="SSD">SSD</label>
              </div>
              <div className="radioBtn">
                <input
                  type="radio"
                  name="storageType"
                  id="HDD"
                  value="HDD"
                  onChange={({ target }) =>
                    handleStateChange('laptop_hard_drive_type', target.value)
                  }
                />
                <label htmlFor="SSD">HDD</label>
              </div>
            </div>
            {errors.storageError && (
              <p className="errorText">{errors.storageError}</p>
            )}
          </div>
        </div>
        <hr style={{ width: '100%' }} />
        <div className="inputGroups">
          <div id="dateField">
            <label htmlFor="dateInput">შეძენის რიცხვი (არჩევითი)</label>
            <input
              type="date"
              id="dateInput"
              name="dateInput"
              value={specsInfo.laptop_purchase_date}
              onInput={({ target }) =>
                handleStateChange('laptop_purchase_date', target.value)
              }
            />
          </div>
          <div id="priceField">
            <label htmlFor="priceInput">ლეპტოპის ფასი</label>
            <input
              type="number"
              id="priceInput"
              name="priceInput"
              value={specsInfo.laptop_price}
              onChange={({ target }) =>
                handleStateChange('laptop_price', target.value)
              }
            />
            {errors.priceError ? (
              <p className="errorText">{errors.priceError}</p>
            ) : (
              <p className="additionalInfo">მხოლოდ ციფრები</p>
            )}
          </div>
        </div>
        <div id="conditionRadioBtns">
          <p>ლეპტოპის მდგომარეობა</p>
          <div className="radioBtnsGroup">
            <div className="radioBtn">
              <input
                type="radio"
                name="condition"
                id="new"
                value="new"
                onChange={({ target }) =>
                  handleStateChange('laptop_state', target.value)
                }
              />
              <label htmlFor="new">ახალი</label>
            </div>
            <div className="radioBtn">
              <input
                type="radio"
                name="condition"
                id="used"
                value="used"
                onChange={({ target }) =>
                  handleStateChange('laptop_state', target.value)
                }
              />
              <label htmlFor="used">ნახმარი</label>
            </div>
          </div>
          {errors.stateError && (
            <p className="errorText">{errors.stateError}</p>
          )}
        </div>

        <div id="actionButtonsGroup">
          <button
            id="previousButton"
            onClick={() => {
              navigate('../addrecord/employee');
            }}
          >
            უკან
          </button>
          <button className="nextButton" onClick={handleSubmit}>
            დამახსოვრება
          </button>
        </div>
      </div>
      <img src="/img/logo-round.png" alt="redberry round logo" />

      <Success
        showModal={showModal}
        setShowModal={setShowModal}
        width={width}
      />
    </div>
  );
};

export default AddSpecs;
