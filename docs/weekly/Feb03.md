# 2020 Feb 03 Notes

<!-- depthFrom=1 depthTo=6 orderedList=false -->

- [Introduction](#Introduction)
- [Previous Researches](#Previous-Researches)
- [Design](#Design)
- [Barriers](#Barriers)

<!-- /TOC -->

## Introduction

With the development of modern society, the complicity of the city structure rise rapidly, thus it is increasingly difficult to efficiently design the urban environment without a real-time and interactive system.

Therefore, in order to tackle this problem, we need to design a deep learning model of semantic image segmentation techniques that divide and highlight different parts in a satellite map.

Our road map:

1. To learn deep learning techniques and previous researches.

1. To prepare training data set, with satellite map divided into labelled fragments.

1. To design a fast verification for model, do training and optimizing.

1. To design a 3D renderer, load output results by model, and render entities with 3D models library.

1. To design a user-friendly UI, can move and place new entities on the map.

## Previous Researches

Saito, S., & Aoki, Y. (2015, February). Building and road detection from large aerial imagery. In Image Processing: Machine Vision Applications VIII (Vol. 9405, p. 94050K). International Society for Optics and Photonics.

Kang, J., Körner, M., Wang, Y., Taubenböck, H., & Zhu, X. X. (2018). Building instance classification using street view images. ISPRS journal of photogrammetry and remote sensing, 145, 44-59.

Zhang, Q., Wang, Y., Liu, Q., Liu, X., & Wang, W. (2016, July). CNN based suburban building detection using monocular high resolution Google Earth images. In 2016 IEEE International Geoscience and Remote Sensing Symposium (IGARSS) (pp. 661-664). IEEE.

Over, M., Schilling, A., Neubauer, S., & Zipf, A. (2010). Generating web-based 3D City Models from OpenStreetMap: The current situation in Germany. Computers, Environment and Urban Systems, 34(6), 496-507.

Sun, L., Tang, Y., & Zhang, L. (2017). Rural building detection in high-resolution imagery based on a two-stage CNN model. IEEE Geoscience and Remote Sensing Letters, 14(11), 1998-2002.

## Design

We have decided to use Python programming language for data manipulations.

Electron and React framework are selected in the UI design and App packaging.

PyTorch is selected to implement our machine learning models, as our supervisor suggested.

## Barriers

No barriers for now.
