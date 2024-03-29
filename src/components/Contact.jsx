import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaPhoneVolume, FaHome, FaClock, FaEnvelope } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { sendEmail, setModalName } from '../features/EmailJS/emailSlice';
import Form from './ContactForm';

import LocalizationImg from '../assets/artech_lowRes.webp';

import { motionControlsValue } from '../utils/utils.js';

const Contact = ({ isEnglish }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const dispatch = useDispatch();
  const controls = useAnimation();

  // UPDATE FORM FIELDS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  // CLEAR FORM FIELDS
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  // SUBMIT FORM AND SET NAME FOR
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setModalName(formData.name));
    dispatch(sendEmail(formData));
    clearForm();
  };

  // CHANGE LANGUAGE ANIMATION
  useEffect(() => {
    const changeLangAnimation = () => {
      controls.start(motionControlsValue);
    };

    changeLangAnimation();
  }, [isEnglish, controls]);

  return (
    <section
      id='contact'
      className='w-full relative bg-slate-200 px-6 pb-14 lg:mt-32'
    >
      <div className='hidden lg:block bg-slate-200 absolute -top-20 rotate-[4deg] -left-12 w-[120%] h-[40%] z-0'></div>
      <div className='flex flex-col w-full max-w-[100rem] mx-auto z-2 pt-12'>
        {/* TITLE */}
        <motion.h2
          className='section_title w-full lg:text-center text-indigo-900 z-10'
          animate={controls}
        >
          {isEnglish ? 'Contact Us' : 'Skontaktuj się z nami'}
        </motion.h2>
        {/* CONTENT CONTAINER */}
        <div className='flex gap-6 flex-col lg:flex-row'>
          {/* SECTION IMAGE */}
          <div className='flex flex-1 order-2 lg:order-1 justify-center mx-2'>
            <img
              src={LocalizationImg}
              alt={isEnglish ? 'Service advertise' : 'Witryna serwisu'}
              className='brightness-50 xl:hover:scale-110 rounded-xl hover:transition hover:brightness-90 shadow-2xl max-w-[21rem] lg:max-h-[25rem] lg:max-w-[28.125rem] xl:max-w-[34.375rem]'
            />
          </div>
          {/* CONTACT INFO */}
          <div className='flex flex-1 order-1 lg:order-2 justify-center my-4'>
            <div className='flex flex-col justify-center gap-6'>
              <div className='flex items-center gap-3'>
                <span className='text-2xl text-indigo-900'>
                  <FaHome />
                </span>
                <ul>
                  <li>Serwis Artech</li>
                  <li>ul. Ogrodowa 50</li>
                  <motion.li animate={controls}>
                    00-873 {isEnglish ? 'Warsaw' : 'Warszawa'}
                  </motion.li>
                </ul>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-2xl text-indigo-900'>
                  <FaClock />
                </span>
                <ul>
                  <motion.li animate={controls}>
                    {isEnglish ? 'Open hours:' : 'Godziny otwarcia:'}
                  </motion.li>
                  <motion.li animate={controls}>
                    {isEnglish
                      ? 'monday-friday 9:00-17:00'
                      : 'poniedziałek-piątek 9:00-17:00'}
                  </motion.li>
                </ul>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-2xl text-indigo-900'>
                  <FaPhoneVolume />
                </span>
                <span>
                  <ul>
                    <li>22 620 14 14</li>
                    <li>501 748 999</li>
                  </ul>
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-2xl text-indigo-900'>
                  <FaEnvelope />
                </span>
                <span>
                  <ul>
                    <li>biuro@serwisartech.pl</li>
                    <li>serwis@artech.waw.pl</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
          {/*EMAIL FORM */}
          <div className='flex flex-col order-3 flex-1 justify-center z-10'>
            <Form
              isEnglish={isEnglish}
              handleChange={(e) => handleChange(e)}
              handleSubmit={(e) => handleSubmit(e)}
              formData={formData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
