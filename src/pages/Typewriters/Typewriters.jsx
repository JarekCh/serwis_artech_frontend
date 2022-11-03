import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typewriter from './Typewriter';

// TODO
// lazy Loading, IntersectionObserver

const Typewriters = ({ isEnglish }) => {
  const { writersResult } = useSelector((store) => store.typewriters);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    const writersForSort = [...writersResult];

    setWriters(
      writersForSort.sort(
        (a, b) => Date.parse(new Date(b.date)) - Date.parse(new Date(a.date))
      )
    );
  }, [writersResult]);

  return (
    <section className='my-6 mx-auto p-6 max-w-[100rem]'>
      <div className='flex flex-col justify-center items-center lg:grid lg:grid-cols-2 2xl:grid-cols-3'>
        {writers.map((writer) => {
          const { slug } = writer;
          return (
            <Typewriter key={slug.current} {...writer} isEnglish={isEnglish} />
          );
        })}
      </div>
    </section>
  );
};

export default Typewriters;
