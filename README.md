# timeslice

## Objective
Timeslice API Integration using NodeJS

## Setup
1. Access your dashboard on timeslice website 
2. Generate/copy the key.
3. Save that key on a file called .timeslice-key in your home directory ( Ex: /home/paulo/.timeslice-key )

## Usage

### get all costs centers
timeslice gp

### reporting hours
timeslice rh -h 01:00 -d 10/10/2010 -p 1 -c 'comment'

-h: hour in HH:MI format

-d: date in DD/MM/YYYY format

-p: cost center [project] id number

-c: comment [need to use singles quotes and the limit is 95 characters] 


 
