#!/bin/bash

echo "Setting up Perlecian's .vimrc..."

cd $HOME/

wget https://github.com/sigurdo/sigurdo.github.io/perlician-vimrc/.vimrc

# Install vim-plug
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim



