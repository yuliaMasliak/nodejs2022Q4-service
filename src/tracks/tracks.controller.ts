import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  Header,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { isValidUUID } from 'src/helpers';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    const newTrack = this.tracksService.create(createTrackDto);
    if (newTrack !== null) {
      return newTrack;
    } else {
      throw new BadRequestException('New track data fields required');
    }
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string) {
    isValidUUID(id);
    const track = this.tracksService.findOne(id);
    if (track === undefined) {
      throw new NotFoundException('Track does not exist');
    } else {
      return track;
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    isValidUUID(id);
    const track = this.tracksService.update(id, updateTrackDto);
    if (track === undefined) {
      throw new NotFoundException('Track does not exist');
    } else if (track === null) {
      throw new BadRequestException('Required fields missing');
    } else {
      return track;
    }
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    isValidUUID(id);
    const track = this.tracksService.remove(id);
    if (track === undefined) {
      throw new NotFoundException('Track does not exist');
    }
  }
}
