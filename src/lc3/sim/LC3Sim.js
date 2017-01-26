import React from 'react';

import './LC3Sim.scss';

let QuickStart = React.createClass({
  render() {
    return <div>
      <h5 className="LC3Sim__sectionTitle">{this.props.title}</h5>
      <div>The LC3 simulator on the UNIX workstations is a very simple program that is composed of three components.</div>
      <div>lc3sim – The actual simulator</div>
      <div>lc3as – The LC3 program assembler.</div>
      <div>lc3convert – binary or hex to object file converter</div>
      <div>Every program must either be assembled using lc3as, or if a bin or hex file, converted using lc3convert. The resulting object file can then run under lc3sim.</div>
    </div>;
  }
});

let Simulator = React.createClass({
  getInitialState() {
    return {
      commands: [
        {
          name: 'file <file>',
          description: 'file load (also sets PC to start of file)'
        },
        {
          name: 'break ...',
          description: 'breakpoint management'
        },
        {
          name: 'continue',
          description: 'continue execution'
        },
        {
          name: 'finish',
          description: 'execute to end of current subroutine'
        },
        {
          name: 'next',
          description: 'execute next instruction (full subroutine/trap)'
        },
        {
          name: 'step',
          description: 'execute one step (into subroutine/trap)'
        },
        {
          name: 'list ...',
          description: 'list instructions at the PC, an address, a label'
        },
        {
          name: 'dump ...',
          description: 'dump memory at the PC, an address, a label'
        },
        {
          name: 'translate <addr>',
          description: 'show the value of a label and print the contents'
        },
        {
          name: 'printregs',
          description: 'print registers and current instruction'
        },
        {
          name: 'memory <addr> <val>',
          description: 'set the value held in a memory location'
        },
        {
          name: 'register <reg> <val>',
          description: 'set a register to a value'
        },
        {
          name: 'execute <file name>',
          description: 'execute a script file'
        },
        {
          name: 'reset',
          description: 'reset LC-3 and reload last file'
        },
        {
          name: 'quit',
          description: 'quit the simulator'
        },
        {
          name: 'help',
          description: 'print this help'
        },
        {
          name: 'help <name>',
          description: 'slightly more helpful information on a single instruction'
        }
      ],
      examples: [
        {
          text: 'm x21 x3300',
          description: 'sets the memory at location x21 to x3300'
        },
        {
          text: 'r pc x3000',
          description: 'sets the program counter to x3000'
        },
        {
          text: 'f test.obj',
          description: 'load the file “test.obj” in the simulator'
        },
        {
          text: 'l x1000',
          description: 'see what is in memory at location x1000 as both data and instructions'
        }
      ]
    };
  },
  render() {
    let commands = this.state.commands.map((command, index) => {
      return <li key={index} className="LC3Sim__row row">
        <div className="col s4">
          <span className="LC3Sim__codeSample">{command.name}</span>
        </div>
        <div className="col s8">{command.description}</div>
      </li>
    });
    let examples = this.state.examples.map((example, index) => {
      return <li key={index} className="LC3Sim__row row">
        <div className="col s4">
          (lc3sim) <span className="LC3Sim__codeSample">{example.text}</span>
        </div>
        <div className="col s8">{example.description}</div>
      </li>
    });
    return <div>
      <h5 className="LC3Sim__sectionTitle">{this.props.title}</h5>
      <div>The LC3 simulator (lc3sim) is a text based program. It works like many text-based debuggers, so having some familiarity with this type of interface will be useful to you in the future. Start lc3sim by simply executing lc3sim from the command line. Note that the lc3sim is only installed on the 32bit unix machines (unix1-3).The object file to execute can be provided at the command-line as an argument, or loaded separately once lc3sim has started. lc3sim dumps all system registers to the screen on start. You can also see the system registers at any time using the ‘p’ or “printregs” command.</div>
      <h6 className="LC3Sim__sectionSubTitle">Commands</h6>
      <ul>{commands}</ul>
      <div>All commands except quit can be abbreviated.</div>
      <div>Note that the simulator assumes all values are hexadecimal.</div>
      <div>Use a "#" to indicate a decimal value (for example, #99).</div>
      <h6 className="LC3Sim__sectionSubTitle">Examples</h6>
      <ul>{examples}</ul>
    </div>;
  }
});

let Assembler = React.createClass({
  render() {
    return <div>
      <h5 className="LC3Sim__sectionTitle">{this.props.title}</h5>
      <div>The LC3 assembler (lc3as) works purely at the command line. lc3as will execute and return to the command line, telling you whether it succeeded or not in creating the object file. The lc3as program is executed at the command line with the *.asm file to assemble supplied as an argument. If successful, the output is an object file with the.obj extension. The assembler will output error messages if the assembly is unsuccessful.</div>
      <div>Example:
        <ul>
          <li><span className="LC3Sim__codeSample">lc3as testfile.asm</span></li>
        </ul>
      </div>
    </div>;
  }
});

let Converter = React.createClass({
  render() {
    return <div>
      <h5 className="LC3Sim__sectionTitle">{this.props.title}</h5>
      <div>The LC3 converter converts the supplied *.bin or *.hex file to an object file. A bin file is a text file with the intended final object file encoded as 1’s and 0’s. A bin file is still a text file and can be opened with notepad or any other text editor. A hex file is a text file with the intended final object file encoded as hexadecimal values. Both bin and hex files assume one command per line. An object file cannot be read using a text editor. If successful, the output is an object file with the .obj extension.</div>
      <div>Examples:
        <ul>
          <li><span className="LC3Sim__codeSample">lc3convert –b2 testfile.bin</span></li>
          <li><span className="LC3Sim__codeSample">lc3convert –b16 testfile.hex</span></li>
        </ul>
      </div>
    </div>;
  }
});

export default React.createClass({
  render() {
    return <div className="LC3Sim__container container">
      <h3 className="center-align">LC3 Simulator Information</h3>
      <QuickStart title="Quickstart Info" />
      <Simulator title="Simulator Info" />
      <Assembler title="Assembler Info" />
      <Converter title="Converter Info" />
    </div>;
  }
});
