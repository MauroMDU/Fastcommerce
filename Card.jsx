import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as Anchor } from "react-router-dom";
import { useDispatch } from 'react-redux';
import productsActions from '../redux/actions/products'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Card() {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.products);

  const getProducts = async () => {
    dispatch(productsActions.data_products());
  }

  useEffect(() => {
    getProducts();
    dispatch(productsActions.data_products());
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[90vw] m-6">
        <Carousel
          showArrows={true}
          autoPlay={true}
          interval={5000}
          infiniteLoop={true}
          showThumbs={false}
          dynamicHeight={false}
          showStatus={false}
          swipeable={true}
          // Añade estas propiedades para mostrar 5 imágenes a la vez
          showIndicators={false}
          centerMode={true}
          centerSlidePercentage={30} // Ajusta el porcentaje para controlar el tamaño de las imágenes
        >
          {products?.map((product) => (
            <div key={product._id} className="bg-white w-[19vw] h-[36vh] rounded-2xl shadow-2xl hover:scale-110">
              <Anchor to={`/products/${product._id}`}>
                <div className="flex items-center justify-center">
                  <img className="w-[13vw] rounded-t-lg border-b object-contain" src={product?.cover_photo[0]} alt="logo" />
                </div>
              </Anchor>
              <div className="flex flex-col p-2">
                <p className="text-start">{product?.name}</p>
                <p className="text-start text-2xl font-bold text-[#ff5757]">${product?.price}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
